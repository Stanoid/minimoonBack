module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: ["H6HKUn0SVZlCgw0Ywi5qOA","KD7PgfzQwCJbbJP+yayogg","fFBU0HDmDHe6dzcFNOylCw","02DvJoC2O9++ZC4Vr4crhA"],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
