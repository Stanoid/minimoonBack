#!/bin/bash

# Production Database Dump Script
# This script helps you dump the production database

echo "🗄️  Production Database Dump Script"
echo "===================================="
echo ""

# Configuration
read -p "Enter SSH username: " SSH_USER
read -p "Enter server address (e.g., minimoondz.com): " SERVER
read -p "Enter database type (postgres/mysql): " DB_TYPE
read -p "Enter database name: " DB_NAME
read -p "Enter database username: " DB_USER

echo ""
echo "📡 Connecting to server and dumping database..."
echo ""

if [ "$DB_TYPE" = "postgres" ]; then
    # PostgreSQL dump
    ssh $SSH_USER@$SERVER "pg_dump -U $DB_USER $DB_NAME | gzip" > production_dump.sql.gz
    echo "✅ PostgreSQL dump completed!"
elif [ "$DB_TYPE" = "mysql" ]; then
    # MySQL dump
    ssh $SSH_USER@$SERVER "mysqldump -u $DB_USER -p $DB_NAME | gzip" > production_dump.sql.gz
    echo "✅ MySQL dump completed!"
else
    echo "❌ Unknown database type: $DB_TYPE"
    exit 1
fi

echo ""
echo "📦 Dump saved to: production_dump.sql.gz"
echo "📊 File size: $(du -h production_dump.sql.gz | cut -f1)"
echo ""
echo "Next steps:"
echo "1. Decompress: gunzip production_dump.sql.gz"
echo "2. Import to local database"
echo "3. Update minimoonBack/.env with local database credentials"
echo ""
