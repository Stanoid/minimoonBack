# 🚀 Deployment Guide - Push to Production

## ✅ What Was Pushed

### Frontend (newmain branch)
- ✅ Updated dependencies (lucide-react)
- ✅ Package.json and package-lock.json
- ✅ All documentation files

### Backend (newmain branch)
- ✅ New API endpoints:
  - Analytics & Reports
  - Hero Images Management
  - Support Messaging System
  - Order Tracking
- ✅ Backend optimizations
- ✅ Database indexes SQL
- ✅ PM2 configuration
- ✅ Complete documentation

---

## 📋 Server Deployment Steps

### Step 1: SSH to Your Server

```bash
ssh username@minimoondz.com
```

### Step 2: Navigate to Project Directory

```bash
cd /path/to/your/project
```

### Step 3: Pull Frontend Changes (newmain)

```bash
# Pull latest frontend code
git pull origin newmain

# Install new dependencies
npm install

# Build frontend
npm run build

# Restart frontend (if using PM2)
pm2 restart frontend-app-name

# Or if using a different process manager
# systemctl restart your-frontend-service
```

### Step 4: Pull Backend Changes (newmain)

```bash
# Navigate to backend directory
cd minimoonBack

# Pull latest backend code
git pull origin newmain

# Install dependencies
npm install

# Build admin panel
npm run build

# Restart backend
pm2 restart strapi-app-name

# Or
# systemctl restart your-backend-service
```

### Step 5: Apply Database Indexes (IMPORTANT!)

```bash
# Navigate to backend directory
cd minimoonBack

# For PostgreSQL
psql -U your_db_user -d your_database < database/indexes.sql

# For MySQL
mysql -u your_db_user -p your_database < database/indexes.sql
```

### Step 6: Configure Permissions in Strapi Admin

1. Go to: https://minimoondz.com/api/admin
2. Navigate to: Settings → Users & Permissions Plugin → Roles

**Public Role:**
- hero-images → find ✅
- order-tracking → trackOrder ✅

**Authenticated Role:**
- support-messages → create, find ✅
- order-tracking → getUserOrders ✅

**Admin Role:**
- analytics → all ✅
- support-messages → all ✅
- order-tracking → all ✅
- hero-images → all ✅

### Step 7: Verify Deployment

**Test Frontend:**
```bash
curl https://minimoondz.com
```

**Test Backend:**
```bash
curl https://minimoondz.com/api/_health
```

**Test New Endpoints:**
```bash
# Hero images (public)
curl https://minimoondz.com/api/api/hero-images

# Analytics (admin - need token)
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://minimoondz.com/api/api/analytics/dashboard
```

---

## 🔧 Troubleshooting

### Frontend Issues

**Issue**: Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

**Issue**: Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Issue**: Strapi won't start
```bash
# Check logs
pm2 logs strapi-app-name

# Or
journalctl -u your-backend-service -f
```

**Issue**: New tables not created
```bash
# Restart Strapi - it will auto-create tables
pm2 restart strapi-app-name
```

**Issue**: Permissions not working
- Check Strapi admin panel
- Verify role permissions are set correctly
- Clear browser cache

### Database Issues

**Issue**: Index creation fails
```bash
# Check if indexes already exist
# PostgreSQL:
\d+ table_name

# MySQL:
SHOW INDEX FROM table_name;
```

**Issue**: Connection error
- Verify database credentials in `.env`
- Check database is running
- Test connection manually

---

## 📊 Post-Deployment Checklist

### Frontend
- [ ] Frontend accessible at https://minimoondz.com
- [ ] No console errors
- [ ] All pages load correctly
- [ ] Images display properly

### Backend
- [ ] Backend accessible at https://minimoondz.com/api/
- [ ] Admin panel works
- [ ] Health check responds: `/_health`
- [ ] New content types visible in admin

### New Features
- [ ] Hero images endpoint works
- [ ] Support messages can be created
- [ ] Order tracking works (public)
- [ ] Analytics dashboard accessible (admin)
- [ ] Inventory report works

### Permissions
- [ ] Public can access hero images
- [ ] Public can track orders
- [ ] Users can create support messages
- [ ] Admins can access analytics
- [ ] Admins can manage all features

### Performance
- [ ] Database indexes applied
- [ ] Response times improved
- [ ] No errors in logs
- [ ] PM2 cluster mode running (if configured)

---

## 🎯 Quick Commands Reference

### Frontend
```bash
# Pull and deploy
git pull origin newmain
npm install
npm run build
pm2 restart frontend-app

# Check status
pm2 status
pm2 logs frontend-app
```

### Backend
```bash
# Pull and deploy
cd minimoonBack
git pull origin newmain
npm install
npm run build
pm2 restart strapi-app

# Check status
pm2 status
pm2 logs strapi-app

# Apply indexes
psql -U user -d db < database/indexes.sql
```

### Monitoring
```bash
# PM2 monitoring
pm2 monit

# Check logs
pm2 logs

# Restart all
pm2 restart all

# Save configuration
pm2 save
```

---

## 📝 Environment Variables

Make sure these are set on the server:

### Frontend (.env.production or .env.local)
```env
NEXT_PUBLIC_API_URL=https://minimoondz.com/api/api/
NEXT_PUBLIC_IMG_URL=https://minimoondz.com/api/
NEXT_PUBLIC_ROOT_URL=https://minimoondz.com/api/
```

### Backend (.env)
```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database
DATABASE_CLIENT=postgres  # or mysql2
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_key

# Client URL
CLIENT_URL=https://minimoondz.com
```

---

## 🔄 Rollback Plan

If something goes wrong:

### Rollback Frontend
```bash
git log --oneline  # Find previous commit
git checkout <previous-commit-hash>
npm install
npm run build
pm2 restart frontend-app
```

### Rollback Backend
```bash
cd minimoonBack
git log --oneline
git checkout <previous-commit-hash>
npm install
pm2 restart strapi-app
```

---

## 📞 Support

### Check Logs
```bash
# PM2 logs
pm2 logs

# System logs
journalctl -u your-service -f

# Nginx logs (if using)
tail -f /var/log/nginx/error.log
```

### Common Issues
1. **Port already in use**: Check and kill process
2. **Permission denied**: Check file permissions
3. **Module not found**: Run `npm install`
4. **Database error**: Check credentials and connection

---

## ✅ Deployment Complete!

Once all steps are done:

1. ✅ Frontend updated and running
2. ✅ Backend updated with new features
3. ✅ Database indexes applied
4. ✅ Permissions configured
5. ✅ All endpoints tested
6. ✅ Monitoring active

**Your updates are now live!** 🎉

Visit: https://minimoondz.com

---

## 📖 Additional Resources

- `NEW_FEATURES_GUIDE.md` - API documentation
- `FEATURES_CHECKLIST.md` - Feature checklist
- `minimoonBack/START_HERE.md` - Backend guide
- `FINAL_STATUS.md` - Complete status

**Need help?** Check the logs and documentation files.
