# 🔧 Server Fix Instructions

## Problem
The server has a nested directory structure (`/root/minimoonBack/minimoonBack/`) and the database configuration is incorrect, causing Strapi to fail with:
```
Cannot destructure property 'client' of 'db.config.connection' as it is undefined.
```

## Solution

### Step 1: SSH to Your Server

```bash
ssh root@minimoondz.com
# Or use your SSH username if different
```

### Step 2: Navigate to Project Directory

```bash
cd /root/minimoonBack
```

### Step 3: Run the Fix Script

**Option A: Upload and run the fix script**

From your local machine:
```bash
scp fix-server.sh root@minimoondz.com:/root/minimoonBack/
```

Then on the server:
```bash
cd /root/minimoonBack
chmod +x fix-server.sh
./fix-server.sh
```

**Option B: Run commands manually**

```bash
cd /root/minimoonBack

# Fix nested structure
if [ -d "minimoonBack" ]; then
    rsync -av minimoonBack/ . --exclude='minimoonBack'
    rsync -av minimoonBack/src/ src/ 2>/dev/null
    rsync -av minimoonBack/types/ types/ 2>/dev/null
    rm -rf minimoonBack
    echo "✅ Nested structure fixed"
fi

# Fix database configuration
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

# Update .env file
if [ -f ".env" ]; then
    # Update DATABASE_NAME
    sed -i 's/^DATABASE_NAME=.*/DATABASE_NAME=minimoonexisting/' .env || echo "DATABASE_NAME=minimoonexisting" >> .env
    
    # Update DATABASE_CLIENT
    sed -i 's/^DATABASE_CLIENT=.*/DATABASE_CLIENT=postgres/' .env || echo "DATABASE_CLIENT=postgres" >> .env
fi

# Restart PM2
pm2 restart minimoon-backend || pm2 restart minimoon || pm2 restart all

# Check status
pm2 status
pm2 logs minimoon-backend --lines 50
```

### Step 4: Verify Database Connection

Check your `.env` file has the correct PostgreSQL credentials:

```bash
cat .env | grep DATABASE
```

Should show something like:
```
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=minimoonexisting
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
```

### Step 5: Test Database Connection

```bash
# Test PostgreSQL connection
psql -h localhost -U postgres -d minimoonexisting -c "\dt" | head -20
```

### Step 6: Check PM2 Logs

```bash
pm2 logs minimoon-backend --lines 100
```

Look for:
- ✅ "Server started" or "Strapi is running"
- ❌ Any database connection errors

### Step 7: Verify API is Working

```bash
curl http://localhost:1337/api/_health
```

Should return a JSON response.

## Troubleshooting

### If database connection fails:

1. Check PostgreSQL is running:
   ```bash
   systemctl status postgresql
   # or
   service postgresql status
   ```

2. Verify database exists:
   ```bash
   psql -U postgres -l | grep minimoon
   ```

3. If database doesn't exist, create it:
   ```bash
   psql -U postgres -c "CREATE DATABASE minimoonexisting;"
   ```

### If PM2 restart fails:

```bash
# Stop all
pm2 stop all

# Start fresh
cd /root/minimoonBack
pm2 start ecosystem.config.js

# Or manually
npm start
```

### If still getting errors:

Check the exact error in logs:
```bash
pm2 logs minimoon-backend --err --lines 200
```

## Summary of Changes

1. ✅ Fixed nested directory structure
2. ✅ Updated `config/database.js` to use PostgreSQL
3. ✅ Set database name to `minimoonexisting`
4. ✅ Updated `.env` file with correct database settings
5. ✅ Restarted PM2 process

After these steps, Strapi should start successfully!

