# 📖 Manual Deployment Instructions

Since I can't SSH directly to your server, here are the exact commands you need to run.

---

## Option 1: Use Automated Script (Recommended)

### For Linux/Mac:
```bash
chmod +x deploy-to-server.sh
./deploy-to-server.sh
```

### For Windows PowerShell:
```powershell
.\deploy-to-server.ps1
```

---

## Option 2: Manual Step-by-Step

### Step 1: SSH to Your Server

```bash
ssh your-username@minimoondz.com
```

Replace `your-username` with your actual SSH username.

---

### Step 2: Navigate to Project

```bash
cd /path/to/your/nextmoon/project
```

Common paths:
- `/var/www/nextmoon`
- `/home/username/nextmoon`
- `/opt/nextmoon`

---

### Step 3: Pull Latest Code

```bash
# Check current branch
git branch

# Pull from newmain
git pull origin newmain
```

If you get conflicts:
```bash
git stash
git pull origin newmain
git stash pop
```

---

### Step 4: Deploy Frontend

```bash
# Install dependencies
npm install

# Build frontend
npm run build
```

Wait for build to complete (may take 1-2 minutes).

---

### Step 5: Deploy Backend

```bash
# Navigate to backend
cd minimoonBack

# Install dependencies
npm install

# Build backend
npm run build
```

---

### Step 6: Apply Database Indexes (IMPORTANT!)

```bash
# Still in minimoonBack directory

# For PostgreSQL:
psql -U your_db_user -d your_database_name < database/indexes.sql

# For MySQL:
mysql -u your_db_user -p your_database_name < database/indexes.sql
```

You'll need:
- Database username
- Database name
- Database password (for MySQL)

---

### Step 7: Restart Services

```bash
# Restart all PM2 processes
pm2 restart all

# Or restart specific apps
pm2 restart nextmoon
pm2 restart strapi

# Check status
pm2 status

# View logs
pm2 logs
```

---

### Step 8: Verify Deployment

```bash
# Check if services are running
pm2 status

# Test health endpoint
curl http://localhost:1337/_health

# Check frontend
curl http://localhost:3000
```

---

## 🔍 Troubleshooting

### Issue: Git pull fails

```bash
# Check git status
git status

# Stash changes
git stash

# Pull again
git pull origin newmain

# Reapply changes if needed
git stash pop
```

### Issue: npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Install again
npm install
```

### Issue: Build fails

```bash
# Clear build cache
rm -rf .next  # for frontend
rm -rf build  # for backend

# Build again
npm run build
```

### Issue: PM2 not found

```bash
# Install PM2 globally
npm install -g pm2

# Or use npx
npx pm2 restart all
```

### Issue: Database indexes fail

```bash
# Check if database is running
# PostgreSQL:
sudo systemctl status postgresql

# MySQL:
sudo systemctl status mysql

# Test connection
psql -U user -d database -c "SELECT 1;"
# or
mysql -u user -p -e "SELECT 1;"
```

---

## 📊 Post-Deployment Checklist

### Verify Services
- [ ] Frontend accessible: https://minimoondz.com
- [ ] Backend accessible: https://minimoondz.com/api/
- [ ] Admin panel works: https://minimoondz.com/api/admin
- [ ] Health check responds: https://minimoondz.com/api/_health

### Configure Permissions
- [ ] Login to Strapi admin
- [ ] Go to Settings → Roles
- [ ] Configure Public role permissions
- [ ] Configure Authenticated role permissions
- [ ] Configure Admin role permissions

### Test New Features
- [ ] Hero images endpoint: `/api/hero-images`
- [ ] Order tracking: `/api/order-tracking/:id`
- [ ] Support messages: `/api/support-messages`
- [ ] Analytics dashboard: `/api/analytics/dashboard`

### Monitor
- [ ] Check PM2 logs: `pm2 logs`
- [ ] Check for errors
- [ ] Monitor performance
- [ ] Test user flows

---

## 🎯 Quick Command Reference

```bash
# SSH to server
ssh username@minimoondz.com

# Navigate to project
cd /path/to/nextmoon

# Pull code
git pull origin newmain

# Deploy frontend
npm install && npm run build

# Deploy backend
cd minimoonBack && npm install && npm run build

# Apply indexes
psql -U user -d db < database/indexes.sql

# Restart
pm2 restart all

# Check status
pm2 status

# View logs
pm2 logs

# Monitor
pm2 monit
```

---

## 📞 Need Help?

### Check Logs
```bash
# All logs
pm2 logs

# Specific app
pm2 logs nextmoon
pm2 logs strapi

# Last 100 lines
pm2 logs --lines 100

# Follow logs
pm2 logs --follow
```

### Check Service Status
```bash
# PM2 status
pm2 status

# Detailed info
pm2 info nextmoon

# Monitor
pm2 monit
```

### Restart Services
```bash
# Restart all
pm2 restart all

# Restart specific
pm2 restart nextmoon

# Reload (zero-downtime)
pm2 reload all

# Stop and start
pm2 stop all
pm2 start all
```

---

## ✅ Deployment Complete!

Once all steps are done:

1. ✅ Code pulled from GitHub
2. ✅ Frontend built and deployed
3. ✅ Backend built and deployed
4. ✅ Database indexes applied
5. ✅ Services restarted
6. ✅ Permissions configured
7. ✅ Features tested

**Your updates are now live!** 🎉

Visit: https://minimoondz.com

---

## 📖 Additional Resources

- `DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `NEW_FEATURES_GUIDE.md` - API documentation
- `FEATURES_CHECKLIST.md` - Feature checklist

**Questions?** Check the logs and documentation files.
