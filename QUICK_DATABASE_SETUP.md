# 🚀 Quick Database Setup - Production to Local

## What You Need

1. **SSH access** to production server (minimoondz.com)
2. **Database credentials** from production
3. **PostgreSQL or MySQL** installed locally

---

## Step-by-Step Guide

### 1️⃣ SSH to Production Server

```bash
ssh your-username@minimoondz.com
```

### 2️⃣ Find Database Info

```bash
# Navigate to Strapi backend
cd /path/to/strapi/backend

# Check database type and credentials
cat .env | grep DATABASE
```

You'll see something like:
```
DATABASE_CLIENT=postgres  # or mysql2
DATABASE_HOST=localhost
DATABASE_NAME=minimoon_db
DATABASE_USERNAME=minimoon_user
DATABASE_PASSWORD=********
```

### 3️⃣ Dump the Database

**For PostgreSQL:**
```bash
pg_dump -U minimoon_user minimoon_db > production_dump.sql
gzip production_dump.sql
```

**For MySQL:**
```bash
mysqldump -u minimoon_user -p minimoon_db > production_dump.sql
gzip production_dump.sql
```

### 4️⃣ Download to Your Computer

**From your local machine (Windows PowerShell):**
```powershell
# Navigate to your project
cd "C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack"

# Download the dump
scp your-username@minimoondz.com:/path/to/production_dump.sql.gz .
```

**Or use WinSCP** (easier for Windows):
1. Download WinSCP: https://winscp.net/
2. Connect to minimoondz.com
3. Download `production_dump.sql.gz`
4. Save to: `C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack\`

### 5️⃣ Install Database Locally

**PostgreSQL (Recommended):**
- Download: https://www.postgresql.org/download/windows/
- Install with default settings
- Remember the password for `postgres` user
- Port: 5432

**MySQL:**
- Download: https://dev.mysql.com/downloads/installer/
- Install MySQL Community Server
- Remember root password
- Port: 3306

### 6️⃣ Create Local Database

**PostgreSQL:**
```bash
# Open pgAdmin or command line
psql -U postgres

# Create database
CREATE DATABASE minimoon_local;

# Exit
\q
```

**MySQL:**
```bash
mysql -u root -p

# Create database
CREATE DATABASE minimoon_local;

# Exit
exit;
```

### 7️⃣ Import Database

**Navigate to backend folder:**
```powershell
cd "C:\Users\TFC solutions\Desktop\nextmoon\minimoonBack"
```

**Decompress:**
```powershell
# Windows PowerShell
Expand-Archive production_dump.sql.gz -DestinationPath .
# Or use 7-Zip if installed
```

**Import:**

**PostgreSQL:**
```bash
psql -U postgres -d minimoon_local < production_dump.sql
```

**MySQL:**
```bash
mysql -u root -p minimoon_local < production_dump.sql
```

### 8️⃣ Configure Backend

**Edit `minimoonBack/.env`:**

**For PostgreSQL:**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="H6HKUn0SVZlCgw0Ywi5qOA,KD7PgfzQwCJbbJP+yayogg,fFBU0HDmDHe6dzcFNOylCw,02DvJoC2O9++ZC4Vr4crhA"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=minimoon_local
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_postgres_password
DATABASE_SSL=false

STRIPE_SECRET_KEY=your-stripe-key
CLIENT_URL=http://localhost:3000
```

**For MySQL:**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="H6HKUn0SVZlCgw0Ywi5qOA,KD7PgfzQwCJbbJP+yayogg,fFBU0HDmDHe6dzcFNOylCw,02DvJoC2O9++ZC4Vr4crhA"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

DATABASE_CLIENT=mysql2
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=minimoon_local
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_mysql_password
DATABASE_SSL=false

STRIPE_SECRET_KEY=your-stripe-key
CLIENT_URL=http://localhost:3000
```

### 9️⃣ Update Database Config

**Edit `minimoonBack/config/database.js`:**

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

### 🔟 Start Everything

**Terminal 1 - Backend:**
```bash
cd minimoonBack
npm install
npm run develop
```

Wait for: `✨ Strapi is running on http://localhost:1337`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Wait for: `✓ Ready in X seconds`

---

## ✅ Verification

1. **Backend**: http://localhost:1337/admin
2. **Frontend**: http://localhost:3000
3. **API**: http://localhost:1337/api/products?func=getAllProducts

---

## 🎯 You're Done!

Now you have:
- ✅ Production database running locally
- ✅ Backend running on localhost:1337
- ✅ Frontend running on localhost:3000
- ✅ Can make and test changes safely

---

## 📝 Notes

- **Images**: Production images are still on the server (Cloudinary or server storage)
- **Uploads**: New uploads will be stored locally
- **Changes**: All changes are local, production is safe
- **Sync**: To update local DB, repeat steps 3-7

---

## 🆘 Need Help?

Tell me:
1. What database type? (PostgreSQL/MySQL)
2. Where are you stuck?
3. Any error messages?

I'll help you through it!
