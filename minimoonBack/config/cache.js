module.exports = ({ env }) => ({
  enabled: env.bool('CACHE_ENABLED', true),
  type: 'mem',
  max: 100,
  maxAge: 3600000, // 1 hour
});
