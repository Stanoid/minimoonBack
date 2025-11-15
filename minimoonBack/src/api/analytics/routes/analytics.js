'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/analytics/dashboard',
      handler: 'analytics.getDashboard',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/analytics/sales',
      handler: 'analytics.getSalesReport',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/analytics/inventory',
      handler: 'analytics.getInventoryReport',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/analytics/top-products',
      handler: 'analytics.getTopProducts',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
