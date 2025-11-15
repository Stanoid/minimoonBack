const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only cache GET requests
    if (ctx.request.method !== 'GET') {
      return await next();
    }

    // Skip caching for authenticated admin requests
    if (ctx.request.url.includes('/admin')) {
      return await next();
    }

    const cacheKey = `${ctx.request.url}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
      ctx.body = cachedResponse;
      ctx.set('X-Cache', 'HIT');
      return;
    }

    await next();

    // Cache successful responses
    if (ctx.status === 200 && ctx.body) {
      cache.set(cacheKey, ctx.body);
      ctx.set('X-Cache', 'MISS');
    }
  };
};
