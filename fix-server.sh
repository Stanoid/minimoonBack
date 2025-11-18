#!/bin/bash
# Server Fix Script - Run this on the server to fix the nested structure and database config

echo "🔧 Fixing Minimoon Backend on Server"
echo "===================================="
echo ""

# Navigate to the project directory
cd /root/minimoonBack || { echo "❌ Directory /root/minimoonBack not found"; exit 1; }

echo "📁 Current directory: $(pwd)"
echo ""

# Check if nested structure exists
if [ -d "minimoonBack" ]; then
    echo "🔄 Moving files from nested minimoonBack/ to root..."
    
    # Move all files from nested directory to root
    rsync -av minimoonBack/ . --exclude='minimoonBack' 2>&1 | head -20
    
    # Move src directory
    if [ -d "minimoonBack/src" ]; then
        rsync -av minimoonBack/src/ src/ 2>&1 | tail -10
    fi
    
    # Move types directory
    if [ -d "minimoonBack/types" ]; then
        rsync -av minimoonBack/types/ types/ 2>&1 | tail -10
    fi
    
    # Remove nested directory
    rm -rf minimoonBack
    echo "✅ Nested structure fixed"
else
    echo "✅ No nested structure found"
fi

echo ""
echo "🔧 Fixing database configuration..."

# Update database.js to use PostgreSQL
cat > config/database.js << 'EOF'
module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'minimoonexisting'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false),
    },
    pool: {
      min: env.int('DATABASE_POOL_MIN', 2),
      max: env.int('DATABASE_POOL_MAX', 20),
    },
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  },
});
EOF

echo "✅ Database configuration updated"
echo ""

# Check if .env file exists and update DATABASE_NAME if needed
if [ -f ".env" ]; then
    echo "📝 Checking .env file..."
    
    # Update DATABASE_NAME to minimoonexisting if it exists
    if grep -q "DATABASE_NAME" .env; then
        sed -i 's/^DATABASE_NAME=.*/DATABASE_NAME=minimoonexisting/' .env
        echo "✅ Updated DATABASE_NAME in .env"
    else
        echo "⚠️  DATABASE_NAME not found in .env, please add it manually"
    fi
    
    # Ensure DATABASE_CLIENT is set to postgres
    if grep -q "DATABASE_CLIENT" .env; then
        sed -i 's/^DATABASE_CLIENT=.*/DATABASE_CLIENT=postgres/' .env
        echo "✅ Updated DATABASE_CLIENT in .env"
    else
        echo "DATABASE_CLIENT=postgres" >> .env
        echo "✅ Added DATABASE_CLIENT to .env"
    fi
else
    echo "⚠️  .env file not found - please create it with database credentials"
fi

echo ""
echo "🔍 Checking PostgreSQL database connection..."

# Try to connect to PostgreSQL and check if database exists
if command -v psql &> /dev/null; then
    DB_NAME=$(grep DATABASE_NAME .env 2>/dev/null | cut -d '=' -f2 | tr -d '"' | tr -d "'" || echo "minimoonexisting")
    DB_USER=$(grep DATABASE_USERNAME .env 2>/dev/null | cut -d '=' -f2 | tr -d '"' | tr -d "'" || echo "postgres")
    
    echo "  Database: $DB_NAME"
    echo "  User: $DB_USER"
    
    if PGPASSWORD=$(grep DATABASE_PASSWORD .env 2>/dev/null | cut -d '=' -f2 | tr -d '"' | tr -d "'") psql -h localhost -U "$DB_USER" -d "$DB_NAME" -c "\q" 2>/dev/null; then
        echo "✅ Database connection successful!"
    else
        echo "⚠️  Could not connect to database - please check credentials in .env"
    fi
else
    echo "⚠️  psql not found - skipping database connection test"
fi

echo ""
echo "🔄 Restarting PM2 process..."

# Restart PM2
if command -v pm2 &> /dev/null; then
    pm2 restart minimoon-backend || pm2 restart minimoon || pm2 restart all
    echo "✅ PM2 restarted"
    echo ""
    echo "📊 PM2 Status:"
    pm2 status
else
    echo "⚠️  PM2 not found - please restart the service manually"
fi

echo ""
echo "✅ Server fix completed!"
echo ""
echo "📋 Next steps:"
echo "  1. Check PM2 logs: pm2 logs minimoon-backend"
echo "  2. Verify database connection in .env file"
echo "  3. Test the API: curl http://localhost:1337/api/_health"
echo ""

