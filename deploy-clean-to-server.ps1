# Deploy CLEAN version (before optimizations) to server 5.189.163.66
# PowerShell version for Windows

$SERVER = "5.189.163.66"
$USER = "root"
$BACKEND_PATH = "/root/minimoonBack"

Write-Host "🔄 Deploying CLEAN version to $SERVER" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will revert to the state BEFORE optimization features" -ForegroundColor Yellow
Write-Host ""

$commands = @"
set -e

echo '📁 Navigating to backend directory...'
cd /root/minimoonBack

echo ''
echo '🛑 Stopping PM2 processes...'
pm2 stop all || true

echo ''
echo '🔄 Fetching latest from git...'
git fetch origin

echo ''
echo '📌 Checking out clean version (before optimizations)...'
git checkout clean-before-optimization
git pull origin clean-before-optimization

echo ''
echo '🧹 Cleaning up...'
rm -rf node_modules package-lock.json

echo ''
echo '📦 Installing dependencies...'
npm install --production

echo ''
echo '🏗️  Building Strapi...'
npm run build

echo ''
echo '🚀 Starting backend with PM2...'
pm2 start ecosystem.config.js
pm2 save

echo ''
echo '⏳ Waiting for backend to start...'
sleep 5

echo ''
echo '✅ DEPLOYMENT COMPLETE!'
echo ''
echo '📊 Status:'
pm2 status

echo ''
echo '🧪 Testing API...'
curl -s http://localhost:1337/api/products | head -30 || echo '⚠️  API not ready yet'

echo ''
echo '📋 Check logs: pm2 logs'
echo '🌐 Visit: http://5.189.163.66:1337'
echo ''
"@

ssh "$USER@$SERVER" $commands

Write-Host ""
Write-Host "✅ Deployment script completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Test backend: http://5.189.163.66:1337/api/products"
Write-Host "  2. Check logs: ssh $USER@$SERVER 'pm2 logs'"
Write-Host "  3. Check status: ssh $USER@$SERVER 'pm2 status'"
Write-Host ""
