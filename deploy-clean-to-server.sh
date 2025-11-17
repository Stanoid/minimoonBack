#!/bin/bash

# Deploy CLEAN version (before optimizations) to server 5.189.163.66
# This reverts to the working state before Strapi optimization features

SERVER="5.189.163.66"
USER="root"
BACKEND_PATH="/root/minimoonBack"

echo "🔄 Deploying CLEAN version to $SERVER"
echo "======================================"
echo ""
echo "This will revert to the state BEFORE optimization features"
echo ""

ssh $USER@$SERVER << 'ENDSSH'

set -e

echo "📁 Navigating to backend directory..."
cd /root/minimoonBack

echo ""
echo "🛑 Stopping PM2 processes..."
pm2 stop all || true

echo ""
echo "🔄 Fetching latest from git..."
git fetch origin

echo ""
echo "📌 Checking out clean version (before optimizations)..."
git checkout clean-before-optimization
git pull origin clean-before-optimization

echo ""
echo "🧹 Cleaning up..."
rm -rf node_modules package-lock.json

echo ""
echo "📦 Installing dependencies..."
npm install --production

echo ""
echo "🏗️  Building Strapi..."
npm run build

echo ""
echo "🚀 Starting backend with PM2..."
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "⏳ Waiting for backend to start..."
sleep 5

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📊 Status:"
pm2 status

echo ""
echo "🧪 Testing API..."
curl -s http://localhost:1337/api/products | head -30 || echo "⚠️  API not ready yet"

echo ""
echo "📋 Check logs: pm2 logs"
echo "🌐 Visit: http://5.189.163.66:1337"
echo ""

ENDSSH

echo ""
echo "✅ Deployment script completed!"
echo ""
echo "Next steps:"
echo "  1. Test backend: http://5.189.163.66:1337/api/products"
echo "  2. Check logs: ssh $USER@$SERVER 'pm2 logs'"
echo "  3. Check status: ssh $USER@$SERVER 'pm2 status'"
echo ""
