# Performance Optimization Checklist

## ✅ Completed Optimizations

### Database
- [x] Increased connection pool from 10 to 20
- [x] Added connection timeout configurations
- [x] Configured charset and timezone
- [x] Created SQL file with recommended indexes

### Caching
- [x] Implemented response caching middleware
- [x] Added in-memory cache for GET requests (5min TTL)
- [x] Created helper service with caching for colors, sizes, pickups
- [x] Added X-Cache headers for monitoring

### Middleware
- [x] Enabled compression middleware
- [x] Increased body parser limits to 10MB
- [x] Optimized CORS configuration
- [x] Extended static file caching to 1 year

### Configuration
- [x] Optimized API limits and pagination
- [x] Extended JWT expiry to 7 days
- [x] Configured upload size limits
- [x] Added image breakpoints for responsive images

### Infrastructure
- [x] Created PM2 ecosystem config for cluster mode
- [x] Optimized Dockerfile (Node 20, health checks)
- [x] Created production environment template
- [x] Updated .dockerignore

## ⚠️ Recommended Next Steps

### Immediate Actions (High Impact)

1. **Apply Database Indexes**
   ```bash
   # Connect to your database and run:
   mysql -u your_user -p your_database < database/indexes.sql
   ```

2. **Remove Console Logs**
   - Search for `console.log` in controllers
   - Replace with `strapi.log.debug()` or remove

3. **Enable Production Mode**
   ```bash
   NODE_ENV=production npm run build
   NODE_ENV=production npm start
   ```

4. **Use PM2 Cluster Mode**
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Medium Priority

5. **Implement Redis Caching**
   ```bash
   npm install ioredis @strapi/provider-session-redis
   ```
   Update config/middlewares.js to use Redis sessions

6. **Optimize Controllers**
   - Move business logic from controllers to services
   - Use the new product-helper.js service
   - Implement proper error handling
   - Add input validation

7. **Database Query Optimization**
   - Review and optimize N+1 queries
   - Use `select` to limit fields
   - Reduce populate depth (max 2 levels)
   - Implement pagination everywhere

8. **Stripe API Optimization**
   - Cache Stripe session data
   - Batch Stripe API calls where possible
   - Implement webhook handlers instead of polling

### Long-term Improvements

9. **CDN Integration**
   - Move uploads to S3/CloudFront or similar
   - Serve static assets via CDN

10. **Load Balancing**
    - Set up Nginx reverse proxy
    - Enable SSL/TLS
    - Configure rate limiting

11. **Monitoring & Logging**
    ```bash
    npm install @strapi/plugin-sentry
    ```
    - Set up error tracking
    - Monitor API response times
    - Track database query performance

12. **Database Maintenance**
    - Schedule regular OPTIMIZE TABLE
    - Archive old orders
    - Clean up expired sessions
    - Monitor database size

## Performance Testing

### Before Optimization
Run baseline tests:
```bash
# Install Apache Bench or similar
ab -n 1000 -c 10 http://localhost:1337/api/products?func=getAllProducts
```

### After Optimization
Compare results after applying changes

### Expected Improvements
- 30-50% faster response times (with caching)
- 20-30% reduction in database load
- Better concurrent request handling
- Lower memory usage

## Monitoring Commands

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Database Performance
```sql
-- Check slow queries (MySQL)
SHOW FULL PROCESSLIST;
SHOW STATUS LIKE 'Slow_queries';

-- Check index usage
SHOW INDEX FROM products;
EXPLAIN SELECT * FROM products WHERE subcatagory_id = 1;
```

### Node.js Memory
```bash
# Check memory usage
pm2 monit

# Restart if memory leak detected
pm2 restart minimoon-backend
```

## Environment Variables

Add to your .env file:
```env
# Performance
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=2048
DATABASE_POOL_MAX=20
CACHE_ENABLED=true

# Monitoring
LOG_LEVEL=info
```

## Quick Reference

### Start Production Server
```bash
NODE_ENV=production npm run build
pm2 start ecosystem.config.js
```

### Clear Cache
Restart the application or implement cache clearing endpoint

### Database Backup
```bash
mysqldump -u user -p database > backup.sql
```

### Check Logs
```bash
pm2 logs minimoon-backend --lines 100
```

## Support

For issues or questions:
1. Check logs: `pm2 logs`
2. Monitor performance: `pm2 monit`
3. Review OPTIMIZATION_GUIDE.md for detailed explanations
