#!/bin/bash

# Local Database Import Script

echo "📥 Local Database Import Script"
echo "================================"
echo ""

read -p "Enter database type (postgres/mysql): " DB_TYPE
read -p "Enter local database name: " DB_NAME
read -p "Enter database username: " DB_USER
read -p "Enter dump file path (default: production_dump.sql): " DUMP_FILE
DUMP_FILE=${DUMP_FILE:-production_dump.sql}

echo ""
echo "📊 Importing database..."
echo ""

if [ "$DB_TYPE" = "postgres" ]; then
    # PostgreSQL import
    psql -U $DB_USER -d $DB_NAME < $DUMP_FILE
    echo "✅ PostgreSQL import completed!"
elif [ "$DB_TYPE" = "mysql" ]; then
    # MySQL import
    mysql -u $DB_USER -p $DB_NAME < $DUMP_FILE
    echo "✅ MySQL import completed!"
else
    echo "❌ Unknown database type: $DB_TYPE"
    exit 1
fi

echo ""
echo "✅ Database imported successfully!"
echo ""
echo "Next steps:"
echo "1. Update minimoonBack/.env with database credentials"
echo "2. Start backend: npm run develop"
echo "3. Start frontend: npm run dev"
echo ""
