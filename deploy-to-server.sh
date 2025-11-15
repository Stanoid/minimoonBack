#!/bin/bash

# Automated Deployment Script for Minimoon
# This script will SSH to your server and deploy the latest changes

echo "🚀 Minimoon Deployment Script"
echo "=============================="
echo ""

# Configuration - UPDATE THESE VALUES
read -p "Enter SSH username: " SSH_USER
read -p "Enter server address (e.g., minimoondz.com): " SERVER
read -p "Enter project path on server (e.g., /var/www/nextmoon): " PROJECT_PATH
read -p "Enter backend path (e.g., /var/www/nextmoon/minimoonBack): " BACKEND_PATH

echo ""
echo "📋 Configuration:"
echo "  SSH: $SSH_USER@$SERVER"
echo "  Project: $PROJECT_PATH"
echo "  Backend: $BACKEND_PATH"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🔐 Connecting to server..."
echo ""

# SSH and execute deployment commands
ssh $SSH_USER@$SERVER << 'ENDSSH'

echo "✅ Connected to server"
echo ""

# Navigate to project
echo "📁 Navigating to project directory..."
cd $PROJECT_PATH || { echo "❌ Project directory not found"; exit 1; }

echo "✅ Current directory: $(pwd)"
echo ""

# Check current branch
echo "🔍 Checking current branch..."
git branch --show-current

echo ""
echo "📥 Pulling latest changes from newmain..."
git pull origin newmain

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed"
    exit 1
fi

echo "✅ Code updated successfully"
echo ""

# Frontend deployment
echo "🎨 Deploying Frontend..."
echo "  - Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "  - Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo "✅ Frontend deployed successfully"
echo ""

# Backend deployment
echo "🔧 Deploying Backend..."
cd $BACKEND_PATH || { echo "❌ Backend directory not found"; exit 1; }

echo "  - Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Backend npm install failed"
    exit 1
fi

echo "  - Building backend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

echo "✅ Backend deployed successfully"
echo ""

# Apply database indexes
echo "📊 Applying database indexes..."
read -p "Enter database type (postgres/mysql): " DB_TYPE
read -p "Enter database name: " DB_NAME
read -p "Enter database username: " DB_USER

if [ "$DB_TYPE" = "postgres" ]; then
    echo "  - Applying PostgreSQL indexes..."
    psql -U $DB_USER -d $DB_NAME < database/indexes.sql
elif [ "$DB_TYPE" = "mysql" ]; then
    echo "  - Applying MySQL indexes..."
    mysql -u $DB_USER -p $DB_NAME < database/indexes.sql
else
    echo "⚠️  Skipping database indexes (unknown type)"
fi

echo ""

# Restart services
echo "🔄 Restarting services..."
pm2 restart all

if [ $? -ne 0 ]; then
    echo "⚠️  PM2 restart failed, trying alternative..."
    # Try restarting specific apps
    pm2 restart nextmoon
    pm2 restart strapi
fi

echo "✅ Services restarted"
echo ""

# Check status
echo "📊 Checking service status..."
pm2 status

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🔍 Next steps:"
echo "  1. Visit https://minimoondz.com to verify frontend"
echo "  2. Visit https://minimoondz.com/api/admin to configure permissions"
echo "  3. Test new endpoints"
echo ""

ENDSSH

echo ""
echo "✅ Deployment script completed!"
echo ""
echo "📖 Post-deployment checklist:"
echo "  - Configure permissions in Strapi admin"
echo "  - Test new features"
echo "  - Monitor logs: ssh $SSH_USER@$SERVER 'pm2 logs'"
echo ""
