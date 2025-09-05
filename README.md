# ☕ Café Bliss - Premium Coffee Shop

A modern, full-stack coffee shop website built with Next.js, featuring a complete e-commerce experience with authentication, product management, and order processing.

## 🚀 Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse and filter coffee products
- **Shopping Cart**: Add/remove items with quantity management
- **Order Processing**: Complete checkout with order tracking
- **Real-time Updates**: Dynamic cart and inventory management

### 🔐 Authentication System
- **User Registration**: Create new customer accounts
- **Secure Login**: Password-protected authentication
- **Role-based Access**: Admin and customer user roles
- **Session Management**: Persistent login across browser sessions

### 👨‍💼 Admin Dashboard
- **Product Management**: Add, edit, delete coffee products
- **Order Management**: View and track customer orders
- **Inventory Control**: Stock management and featured products
- **Analytics**: Order statistics and customer insights

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - Component-based UI
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Context API** - State management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database abstraction layer
- **SQLite** - Development database
- **bcryptjs** - Password hashing

### Development Tools
- **TypeScript** - Type safety (optional)
- **ESLint** - Code linting
- **Turbopack** - Fast development builds

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coffee-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   npm run prisma:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Models
- **User**: Customer and admin accounts
- **Product**: Coffee products and inventory
- **Order**: Customer orders
- **OrderItem**: Individual items in orders

### Default Admin Account
- **Email**: `owner@coffee.com`
- **Password**: `admin123`
- **Role**: Admin

## 📁 Project Structure

```
coffee-shop/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── cart/           # Shopping cart page
│   │   ├── login/          # Authentication pages
│   │   ├── products/       # Product catalog
│   │   └── signup/
│   ├── components/         # Reusable UI components
│   ├── context/           # React Context providers
│   └── lib/               # Utility functions
├── prisma/                # Database schema and migrations
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order

### Health Check
- `GET /api/health` - API status

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site with serverless functions
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

### Production Database
For production, consider upgrading to:
- **PostgreSQL** - Full-featured relational database
- **PlanetScale** - Serverless MySQL
- **Supabase** - PostgreSQL with real-time features

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Shopping cart functionality
- [ ] Order placement and confirmation
- [ ] Admin product management
- [ ] Admin order management
- [ ] Responsive design on mobile
- [ ] Error handling and edge cases

### Automated Testing (Future)
- Unit tests with Jest
- Integration tests with Playwright
- API tests with Supertest

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Prisma ORM
- **XSS Protection**: React's built-in escaping
- **CSRF Protection**: Next.js built-in protection
- **Security Headers**: Configured in next.config.js

## 📈 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Component-level lazy loading
- **Caching**: API response caching
- **Compression**: Gzip compression enabled
- **Bundle Analysis**: Webpack bundle analyzer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Database Connection Error**
```bash
npx prisma migrate reset
npx prisma migrate dev
npm run prisma:seed
```

**Build Errors**
```bash
rm -rf .next
npm run build
```

**Port Already in Use**
```bash
npm run dev -- -p 3001
```

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with detailed description
- Include error messages and steps to reproduce

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic e-commerce functionality
- [x] User authentication
- [x] Admin dashboard
- [x] Order management

### Phase 2 (Future)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced filtering and search
- [ ] Inventory management
- [ ] Analytics dashboard

### Phase 3 (Advanced)
- [ ] Multi-vendor support
- [ ] Subscription coffee service
- [ ] Mobile app (React Native)
- [ ] Real-time chat support
- [ ] Advanced reporting

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Prisma Team** - Excellent database toolkit
- **Tailwind CSS** - Beautiful utility-first CSS
- **Framer Motion** - Smooth animations
- **Coffee Community** - Inspiration for the project

---

**Built with ☕ and ❤️ by the Café Bliss Team**

For more information, visit our [website](https://cafebliss.com) or contact us at hello@cafebliss.com