# PowerShell Deployment Script for Minimoon
# Run this from your local Windows machine

Write-Host "🚀 Minimoon Deployment Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$SSH_USER = Read-Host "Enter SSH username"
$SERVER = Read-Host "Enter server address (e.g., minimoondz.com)"
$PROJECT_PATH = Read-Host "Enter project path on server (e.g., /var/www/nextmoon)"

Write-Host ""
Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "  SSH: $SSH_USER@$SERVER"
Write-Host "  Project: $PROJECT_PATH"
Write-Host ""

$CONFIRM = Read-Host "Is this correct? (y/n)"

if ($CONFIRM -ne "y") {
    Write-Host "❌ Deployment cancelled" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔐 Connecting to server..." -ForegroundColor Green
Write-Host ""

# Create deployment commands
$deployCommands = @"
cd $PROJECT_PATH
echo '📥 Pulling latest changes...'
git pull origin newmain
echo '🎨 Installing frontend dependencies...'
npm install
echo '🏗️  Building frontend...'
npm run build
echo '🔧 Installing backend dependencies...'
cd minimoonBack
npm install
echo '🏗️  Building backend...'
npm run build
echo '🔄 Restarting services...'
pm2 restart all
echo '📊 Checking status...'
pm2 status
echo '✅ Deployment complete!'
"@

# Execute via SSH
ssh "$SSH_USER@$SERVER" $deployCommands

Write-Host ""
Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📖 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Visit https://minimoondz.com"
Write-Host "  2. Configure permissions in Strapi admin"
Write-Host "  3. Test new features"
Write-Host ""
Write-Host "📊 To check logs:" -ForegroundColor Yellow
Write-Host "  ssh $SSH_USER@$SERVER 'pm2 logs'"
Write-Host ""
