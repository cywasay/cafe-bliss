import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import AnalyticsService from '../../../lib/analytics';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { items, total } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Items are required' },
        { status: 400 }
      );
    }

    // Create the order with items
    const order = await prisma.order.create({
      data: {
        total: parseFloat(total),
        status: 'received',
        items: {
          create: items.map(item => ({
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price)
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Track analytics after successful order creation
    try {
      // Track order placement
      await AnalyticsService.trackOrderPlaced(
        order.id,
        order.total,
        null, // userId - can be added from auth context if available
        {
          itemCount: order.items.length,
          paymentMethod: 'cash_on_delivery'
        }
      );

      // Track individual product sales
      for (const item of order.items) {
        await AnalyticsService.trackEvent(
          'product_sold',
          item.quantity,
          {
            productId: item.productId,
            productName: item.product.name,
            price: item.price,
            revenue: item.quantity * item.price
          }
        );
      }
    } catch (analyticsError) {
      // Don't fail the order if analytics fails
      console.error('Analytics tracking failed:', analyticsError);
    }

    return NextResponse.json({
      success: true,
      order,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}