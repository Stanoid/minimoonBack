# 🔄 Clean Version - Before Optimizations

## What is This?

This is the **clean, working version** of your project from **before** all the Strapi optimization features were added.

**Branch**: `clean-before-optimization`  
**Commit**: `6bdb8d7`  
**Server**: `5.189.163.66`

---

## What's Included

✅ **Frontend** - Working Next.js app  
✅ **Backend** - Working Strapi without optimization features  
✅ **No extra features** - Just the core functionality  
✅ **Stable** - Last known working state  

---

## What's NOT Included

❌ Analytics API  
❌ Hero Images Management  
❌ Support Messages  
❌ Order Tracking  
❌ Database indexes  
❌ Performance optimizations  

---

## Deploy to Server

### Option 1: Automated Script (Linux/Mac)

```bash
chmod +x deploy-clean-to-server.sh
./deploy-clean-to-server.sh
```

### Option 2: Automated Script (Windows)

```powershell
.\deploy-clean-to-server.ps1
```

### Option 3: Manual Deployment

```bash
# SSH to server
ssh root@5.189.163.66

# Go to backend
cd /root/minimoonBack

# Stop PM2
pm2 stop all

# Checkout clean version
git fetch origin
git checkout clean-before-optimization
git pull origin clean-before-optimization

# Clean install
rm -rf node_modules package-lock.json
npm install --production

# Build
npm run build

# Start
pm2 start ecosystem.config.js
pm2 save

# Check status
pm2 status
pm2 logs
```

---

## Test After Deployment

```bash
# Test API
curl http://5.189.163.66:1337/api/products

# Check PM2 status
ssh root@5.189.163.66 'pm2 status'

# View logs
ssh root@5.189.163.66 'pm2 logs'
```

---

## Switch Between Versions

### Go to Clean Version (This One)
```bash
git checkout clean-before-optimization
```

### Go Back to Latest (With Optimizations)
```bash
git checkout main
# or
git checkout newmain
```

---

## Why Use This?

Use this clean version if:
- ✅ The optimized version has issues
- ✅ You want a stable, working baseline
- ✅ You need to start fresh
- ✅ You want to test without new features

---

## Current Branches

- `clean-before-optimization` ← **This version** (stable, no optimizations)
- `main` / `newmain` ← Latest with all features and optimizations

---

## Server Info

**IP**: `5.189.163.66`  
**User**: `root`  
**Backend Path**: `/root/minimoonBack`  
**Port**: `1337`  

**Test URL**: http://5.189.163.66:1337/api/products

---

## Need Help?

1. Check PM2 logs: `pm2 logs`
2. Check PM2 status: `pm2 status`
3. Restart: `pm2 restart all`
4. View this file: `CLEAN_VERSION_INFO.md`

---

**✅ This is your stable, working version!**
