#!/bin/bash
# Quick one-liner fix for server - copy and paste this entire script on the server

cd /root/minimoonBack && \
[ -d "minimoonBack" ] && rsync -av minimoonBack/ . --exclude='minimoonBack' && rsync -av minimoonBack/src/ src/ 2>/dev/null && rsync -av minimoonBack/types/ types/ 2>/dev/null && rm -rf minimoonBack && \
cat > config/database.js << 'DBEOF'
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
DBEOF
[ -f ".env" ] && sed -i 's/^DATABASE_NAME=.*/DATABASE_NAME=minimoonexisting/' .env 2>/dev/null || echo "DATABASE_NAME=minimoonexisting" >> .env && \
[ -f ".env" ] && sed -i 's/^DATABASE_CLIENT=.*/DATABASE_CLIENT=postgres/' .env 2>/dev/null || echo "DATABASE_CLIENT=postgres" >> .env && \
pm2 restart minimoon-backend 2>/dev/null || pm2 restart minimoon 2>/dev/null || pm2 restart all && \
echo "✅ Fix completed! Check logs with: pm2 logs minimoon-backend"

