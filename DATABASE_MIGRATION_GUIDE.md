# Database Migration Guide - Production to Local

## Goal
Copy the production database to your local machine so you can test backend changes with real data.

---

## Step 1: SSH to Production Server

```bash
ssh username@minimoondz.com
# or
ssh username@server-ip-address
```

---

## Step 2: Identify Database Type

Check what database your production server uses:

```bash
cd /path/to/strapi/backend
cat config/database.js
# or
cat .env | grep DATABASE
```

Common types:
- **PostgreSQL** (most common for production)
- **MySQL/MariaDB**
- **SQLite** (unlikely for production)

---

## Step 3: Dump Production Database

### For PostgreSQL:

```bash
# Find database name and credentials
cat .env | grep DATABASE

# Dump the database
pg_dump -U database_username -h localhost database_name > production_dump.sql

# Or with password prompt
pg_dump -U database_username -h localhost -W database_name > production_dump.sql

# Compress for faster download
gzip production_dump.sql
```

### For MySQL/MariaDB:

```bash
# Find database credentials
cat .env | grep DATABASE

# Dump the database
mysqldump -u database_username -p database_name > production_dump.sql

# Or all at once
mysqldump -u database_username -p database_name > production_dump.sql

# Compress
gzip production_dump.sql
```

---

## Step 4: Download Database Dump to Local Machine

### Option A: Using SCP (from your local machine)

```bash
# For PostgreSQL dump
scp username@minimoondz.com:/path/to/production_dump.sql.gz C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack\

# For MySQL dump
scp username@minimoondz.com:/path/to/production_dump.sql.gz C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack\
```

### Option B: Using SFTP

```bash
sftp username@minimoondz.com
cd /path/to/dump
get production_dump.sql.gz
exit
```

### Option C: Using WinSCP (Windows GUI)
1. Download WinSCP: https://winscp.net/
2. Connect to your server
3. Navigate to dump file location
4. Drag and drop to local folder

---

## Step 5: Install Database Locally (if not installed)

### PostgreSQL (Recommended):

**Windows:**
1. Download: https://www.postgresql.org/download/windows/
2. Install PostgreSQL 14 or 15
3. Remember the password you set for `postgres` user
4. Default port: 5432

**Or use Docker:**
```bash
docker run --name postgres-local -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:14
```

### MySQL:

**Windows:**
1. Download: https://dev.mysql.com/downloads/installer/
2. Install MySQL Community Server
3. Remember root password
4. Default port: 3306

**Or use Docker:**
```bash
docker run --name mysql-local -e MYSQL_ROOT_PASSWORD=mysecretpassword -p 3306:3306 -d mysql:8
```

---

## Step 6: Create Local Database

### For PostgreSQL:

```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE minimoon_local;

# Create user (optional)
CREATE USER minimoon WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE minimoon_local TO minimoon;

# Exit
\q
```

### For MySQL:

```bash
# Open MySQL command line
mysql -u root -p

# Create database
CREATE DATABASE minimoon_local;

# Create user (optional)
CREATE USER 'minimoon'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON minimoon_local.* TO 'minimoon'@'localhost';
FLUSH PRIVILEGES;

# Exit
exit;
```

---

## Step 7: Import Database Dump

### For PostgreSQL:

```bash
# Navigate to backend folder
cd C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack

# Decompress if needed
gunzip production_dump.sql.gz

# Import
psql -U postgres -d minimoon_local < production_dump.sql

# Or with specific user
psql -U minimoon -d minimoon_local < production_dump.sql
```

### For MySQL:

```bash
# Navigate to backend folder
cd C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack

# Decompress if needed
gunzip production_dump.sql.gz

# Import
mysql -u root -p minimoon_local < production_dump.sql

# Or with specific user
mysql -u minimoon -p minimoon_local < production_dump.sql
```

---

## Step 8: Update Local Backend Configuration

Update `minimoonBack/.env`:

### For PostgreSQL:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="H6HKUn0SVZlCgw0Ywi5qOA,KD7PgfzQwCJbbJP+yayogg,fFBU0HDmDHe6dzcFNOylCw,02DvJoC2O9++ZC4Vr4crhA"
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here

# Database - PostgreSQL
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=minimoon_local
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_postgres_password
DATABASE_SSL=false

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key

# Client URL
CLIENT_URL=http://localhost:3000
```

### For MySQL:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="H6HKUn0SVZlCgw0Ywi5qOA,KD7PgfzQwCJbbJP+yayogg,fFBU0HDmDHe6dzcFNOylCw,02DvJoC2O9++ZC4Vr4crhA"
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here

# Database - MySQL
DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=minimoon_local
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_mysql_password
DATABASE_SSL=false

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key

# Client URL
CLIENT_URL=http://localhost:3000
```

---

## Step 9: Update Database Config

Update `minimoonBack/config/database.js` to use the correct database:

```javascript
const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'minimoon_local'),
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
```

---

## Step 10: Update Frontend to Use Local Backend

Update `.env.local`:

```env
# Frontend Environment Variables - Local Development

# Backend API URL (Local Strapi)
NEXT_PUBLIC_API_URL=http://localhost:1337/api/
NEXT_PUBLIC_IMG_URL=http://localhost:1337
NEXT_PUBLIC_ROOT_URL=http://localhost:1337

# Image Configuration
NEXT_PUBLIC_IMG_CONFIG_URL=http://res.cloudinary.com/
```

---

## Step 11: Start Local Backend

```bash
cd minimoonBack
npm install
npm run develop
```

Wait for:
```
[INFO] ✨ Strapi is running on http://localhost:1337
```

---

## Step 12: Restart Frontend

```bash
# Stop current frontend (Ctrl+C)
# Then restart
npm run dev
```

---

## Verification Checklist

✅ Database dump downloaded from production
✅ Local database created
✅ Database dump imported successfully
✅ Backend `.env` configured with local database
✅ Backend `config/database.js` updated
✅ Frontend `.env.local` points to localhost
✅ Backend running on http://localhost:1337
✅ Frontend running on http://localhost:3000
✅ Can access data from local backend

---

## Quick Commands Reference

### Check if database imported correctly:

**PostgreSQL:**
```bash
psql -U postgres -d minimoon_local
\dt  # List all tables
SELECT COUNT(*) FROM products;  # Check products
SELECT COUNT(*) FROM orders;    # Check orders
\q
```

**MySQL:**
```bash
mysql -u root -p minimoon_local
SHOW TABLES;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM orders;
exit;
```

---

## Troubleshooting

### Database connection error
- Check database is running
- Verify credentials in `.env`
- Check port is correct (5432 for PostgreSQL, 3306 for MySQL)

### Import fails
- Check dump file is not corrupted
- Ensure database is empty before import
- Check user has proper permissions

### Backend won't start
- Check all environment variables are set
- Verify database connection works
- Check logs for specific errors

---

## Alternative: Use Docker Compose

Create `docker-compose.yml` in `minimoonBack/`:

```yaml
version: '3'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: minimoon_local
      POSTGRES_USER: minimoon
      POSTGRES_PASSWORD: minimoon
    ports:
      - "5432:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
      - ./production_dump.sql:/docker-entrypoint-initdb.d/dump.sql
```

Then run:
```bash
docker-compose up -d
```

---

## Need Help?

Provide me with:
1. What database type is on production? (PostgreSQL/MySQL)
2. Do you have SSH access to the server?
3. Do you have database credentials?
4. Any error messages you encounter

I'll help you through each step!
