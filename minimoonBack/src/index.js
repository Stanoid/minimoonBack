'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Register custom middleware
    strapi.server.use(require('./middlewares/response-cache')({}, { strapi }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Warm up database connections
    await strapi.db.connection.raw('SELECT 1');
    
    // Log startup
    strapi.log.info('🚀 Strapi backend optimized and ready!');
  },
};
