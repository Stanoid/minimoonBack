'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/order-tracking/:orderId',
      handler: 'order-tracking.trackOrder',
      config: {
        auth: false, // Allow tracking without auth using order ID
      },
    },
    {
      method: 'GET',
      path: '/order-tracking/user/orders',
      handler: 'order-tracking.getUserOrders',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/order-tracking/:orderId/status',
      handler: 'order-tracking.updateStatus',
      config: {
        policies: [],
      },
    },
  ],
};
