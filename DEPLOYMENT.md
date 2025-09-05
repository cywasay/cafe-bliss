# 🚀 Deployment Guide - Café Bliss

This guide will help you deploy your Café Bliss coffee shop website to various platforms.

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All features working locally
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Security headers configured

### ✅ Environment Setup
- [ ] Production database configured
- [ ] Environment variables set
- [ ] API keys secured
- [ ] Domain name ready

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Built for Next.js
- Automatic deployments
- Edge functions
- Global CDN
- Free tier available

**Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables:**
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

### 2. Netlify

**Steps:**
1. Build the project: `npm run build`
2. Upload `out` folder to Netlify
3. Configure redirects for SPA

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Railway

**Steps:**
1. Connect GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically

### 4. DigitalOcean App Platform

**Steps:**
1. Create new app
2. Connect GitHub repository
3. Add managed database
4. Configure environment variables

## 🗄️ Database Migration

### SQLite to PostgreSQL

1. **Export SQLite data:**
```bash
sqlite3 dev.db .dump > backup.sql
```

2. **Create PostgreSQL database:**
```sql
CREATE DATABASE coffee_shop;
```

3. **Update Prisma schema:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. **Run migrations:**
```bash
npx prisma migrate deploy
npx prisma db seed
```

## 🔧 Production Configuration

### Environment Variables

Create `.env.production`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/coffee_shop"

# Next.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Optional: Payment
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### Performance Optimization

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## 🔒 Security Checklist

### ✅ Authentication
- [ ] Strong passwords enforced
- [ ] Password hashing (bcrypt)
- [ ] Session management
- [ ] CSRF protection

### ✅ Data Protection
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] HTTPS enabled

### ✅ Server Security
- [ ] Security headers
- [ ] Rate limiting
- [ ] Error handling
- [ ] Logging configured

## 📊 Monitoring & Analytics

### 1. Error Tracking
- **Sentry**: Real-time error monitoring
- **LogRocket**: Session replay and error tracking

### 2. Performance Monitoring
- **Vercel Analytics**: Built-in performance metrics
- **Google Analytics**: User behavior tracking
- **Core Web Vitals**: Performance optimization

### 3. Uptime Monitoring
- **UptimeRobot**: Website availability
- **Pingdom**: Performance monitoring

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

## 🔄 Backup Strategy

### Database Backups
```bash
# Daily backup script
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### File Backups
- Use cloud storage (AWS S3, Google Cloud)
- Automated daily backups
- Version control for code

## 📈 Scaling Considerations

### Performance
- **CDN**: Global content delivery
- **Caching**: Redis for session storage
- **Database**: Connection pooling
- **Images**: Optimized formats (WebP, AVIF)

### Infrastructure
- **Load Balancing**: Multiple server instances
- **Database**: Read replicas
- **Monitoring**: Real-time alerts
- **Auto-scaling**: Based on traffic

## 🆘 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache
rm -rf .next
npm run build
```

**Database Connection:**
```bash
# Test connection
npx prisma db push
```

**Environment Variables:**
```bash
# Verify variables
vercel env ls
```

### Support Resources
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

## 📞 Post-Deployment

### Testing Checklist
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Cart functionality
- [ ] Admin dashboard
- [ ] Mobile responsiveness
- [ ] Performance metrics

### Go-Live Checklist
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Backup system
- [ ] Support documentation

---

**🎉 Congratulations! Your Café Bliss website is now live and ready to serve customers!**

For additional support, contact the development team or check the [README.md](README.md) for more information.
