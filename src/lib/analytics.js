import { prisma } from './prisma';

class AnalyticsService {
  // Track events
  static async trackEvent(event, value = null, metadata = null, userId = null) {
    try {
      await prisma.analytics.create({
        data: {
          event,
          value: value ? parseFloat(value) : null,
          metadata: metadata ? JSON.stringify(metadata) : null,
          userId: userId ? parseInt(userId) : null
        }
      });
      console.log(`Analytics event tracked: ${event}`);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Get comprehensive analytics data
  static async getAnalytics(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    try {
      // Get daily sales data
      const dailySales = await prisma.$queryRaw`
        SELECT 
          DATE(createdAt) as date,
          COUNT(*) as orders,
          COALESCE(SUM(total), 0) as revenue
        FROM Order 
        WHERE createdAt >= ${startDate}
        GROUP BY DATE(createdAt)
        ORDER BY date ASC
      `;

      // Get total revenue and orders
      const totalStats = await prisma.order.aggregate({
        where: {
          createdAt: { gte: startDate }
        },
        _sum: { total: true },
        _count: true
      });

      // Get popular products
      const popularProducts = await prisma.$queryRaw`
        SELECT 
          p.id,
          p.name,
          p.price,
          SUM(oi.quantity) as totalSold,
          SUM(oi.quantity * oi.price) as revenue
        FROM Product p
        LEFT JOIN OrderItem oi ON p.id = oi.productId
        LEFT JOIN Order o ON oi.orderId = o.id
        WHERE o.createdAt >= ${startDate} OR o.createdAt IS NULL
        GROUP BY p.id, p.name, p.price
        ORDER BY totalSold DESC
        LIMIT 10
      `;

      // Get recent orders
      const recentOrders = await prisma.order.findMany({
        where: {
          createdAt: { gte: startDate }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      });

      // Get analytics events
      const analyticsEvents = await prisma.analytics.groupBy({
        by: ['event'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: true,
        _sum: { value: true }
      });

      // Calculate growth metrics (compared to previous period)
      const previousPeriodStart = new Date(startDate);
      previousPeriodStart.setDate(previousPeriodStart.getDate() - days);
      
      const previousStats = await prisma.order.aggregate({
        where: {
          createdAt: { 
            gte: previousPeriodStart,
            lt: startDate
          }
        },
        _sum: { total: true },
        _count: true
      });

      // Calculate percentage growth
      const orderGrowth = previousStats._count > 0 
        ? ((totalStats._count - previousStats._count) / previousStats._count * 100).toFixed(1)
        : 0;
      
      const revenueGrowth = previousStats._sum.total > 0 
        ? ((totalStats._sum.total - previousStats._sum.total) / previousStats._sum.total * 100).toFixed(1)
        : 0;

      // Format daily sales data
      const formattedDailySales = dailySales.map(sale => ({
        date: new Date(sale.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        revenue: parseFloat(sale.revenue) || 0,
        orders: parseInt(sale.orders) || 0
      }));

      // Format popular products
      const formattedPopularProducts = popularProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price) || 0,
        totalSold: parseInt(product.totalSold) || 0,
        revenue: parseFloat(product.revenue) || 0
      }));

      return {
        // Overview stats
        totalRevenue: parseFloat(totalStats._sum.total) || 0,
        totalOrders: totalStats._count || 0,
        averageOrderValue: totalStats._count > 0 
          ? parseFloat((totalStats._sum.total / totalStats._count).toFixed(2))
          : 0,
        
        // Growth metrics
        orderGrowth: `${orderGrowth >= 0 ? '+' : ''}${orderGrowth}%`,
        revenueGrowth: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth}%`,
        
        // Charts data
        dailySales: formattedDailySales,
        popularProducts: formattedPopularProducts,
        
        // Recent activity
        recentOrders,
        
        // Event analytics
        eventStats: analyticsEvents.map(event => ({
          event: event.event,
          count: event._count,
          totalValue: parseFloat(event._sum.value) || 0
        })),
        
        // Time period info
        timeRange: days,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Analytics fetch error:', error);
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  }

  // Get customer analytics
  static async getCustomerAnalytics(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    try {
      // Get customer count and growth
      const totalCustomers = await prisma.user.count({
        where: { role: 'user' }
      });

      const newCustomers = await prisma.user.count({
        where: {
          role: 'user',
          createdAt: { gte: startDate }
        }
      });

      return {
        totalCustomers,
        newCustomers,
        customerRetentionRate: 68 // This would need more complex calculation
      };
    } catch (error) {
      console.error('Customer analytics error:', error);
      throw error;
    }
  }

  // Track page views
  static async trackPageView(page, userId = null, metadata = null) {
    await this.trackEvent('page_view', 1, { page, ...metadata }, userId);
  }

  // Track product views
  static async trackProductView(productId, userId = null, metadata = null) {
    await this.trackEvent('product_view', 1, { productId, ...metadata }, userId);
  }

  // Track add to cart
  static async trackAddToCart(productId, quantity = 1, userId = null, metadata = null) {
    await this.trackEvent('add_to_cart', quantity, { productId, ...metadata }, userId);
  }

  // Track order placement
  static async trackOrderPlaced(orderId, orderValue, userId = null, metadata = null) {
    await this.trackEvent('order_placed', orderValue, { orderId, ...metadata }, userId);
  }

  // Track order completion
  static async trackOrderCompleted(orderId, orderValue, userId = null, metadata = null) {
    await this.trackEvent('order_completed', orderValue, { orderId, ...metadata }, userId);
  }
}

export default AnalyticsService;