'use strict';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async trackOrder(ctx) {
    try {
      const { orderId } = ctx.params;

      const order = await strapi.db.query('api::order.order').findOne({
        where: { id: orderId },
        populate: ['pickup', 'users_permissions_user'],
      });

      if (!order) {
        return ctx.notFound('Order not found');
      }

      let orderDetails = {
        id: order.id,
        status: order.status,
        payment_type: order.payment_type,
        delivery_type: order.delivery_type,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
        address: order.address,
        phone: order.phone,
        pickup: order.pickup,
      };

      // Get payment details if online payment
      if (order.payment_type === 'online' && order.session_id) {
        try {
          const session = await stripe.checkout.sessions.retrieve(order.session_id);
          orderDetails.payment_status = session.payment_status;
          orderDetails.amount_total = session.amount_total / 100;
          orderDetails.currency = session.currency;
        } catch (error) {
          strapi.log.error('Stripe session error:', error);
        }
      }

      // Calculate order total for cash on delivery
      if (order.payment_type === 'delivery') {
        let total = 0;
        for (const item of order.cart || []) {
          const varient = await strapi.db.query('api::varient.varient').findOne({
            where: { id: item.id },
            select: ['price'],
          });
          if (varient) {
            total += varient.price * item.qty;
          }
        }
        
        if (order.pickup) {
          total += order.delivery_type === 'pickup' 
            ? order.pickup.pickup_price 
            : order.pickup.home_price;
        }
        
        orderDetails.amount_total = total;
        orderDetails.payment_status = 'unpaid';
      }

      // Get cart items with product details
      const cartWithDetails = [];
      for (const item of order.cart || []) {
        const product = await strapi.db.query('api::product.product').findOne({
          where: {
            varients: { id: item.id },
          },
          populate: ['images', 'varients', 'varients.colors', 'varients.sizes'],
        });

        if (product) {
          const varient = product.varients.find(v => v.id === item.id);
          cartWithDetails.push({
            ...item,
            product_name: product.name_en || product.name_ar,
            product_code: product.code,
            image: product.images?.[0],
            color: varient?.colors?.[0],
            size: varient?.sizes?.[0],
            price: varient?.price,
          });
        }
      }

      orderDetails.cart = cartWithDetails;

      // Order status timeline
      orderDetails.timeline = [
        {
          status: 'initiated',
          label: 'Order Placed',
          completed: true,
          date: order.createdAt,
        },
        {
          status: 'processed',
          label: 'Order Confirmed',
          completed: order.status === 'processed' || order.status === 'delivered',
          date: order.status === 'processed' || order.status === 'delivered' ? order.updatedAt : null,
        },
        {
          status: 'shipped',
          label: 'Shipped',
          completed: order.status === 'delivered',
          date: null, // You can add a shipped_at field to track this
        },
        {
          status: 'delivered',
          label: 'Delivered',
          completed: order.status === 'delivered',
          date: order.status === 'delivered' ? order.updatedAt : null,
        },
      ];

      return orderDetails;
    } catch (error) {
      strapi.log.error('Track order error:', error);
      return ctx.badRequest('Failed to track order');
    }
  },

  async getUserOrders(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('You must be logged in');
      }

      const orders = await strapi.db.query('api::order.order').findMany({
        where: {
          users_permissions_user: { id: user.id },
        },
        orderBy: [{ createdAt: 'desc' }],
        populate: ['pickup'],
      });

      const ordersWithDetails = [];

      for (const order of orders) {
        let orderData = {
          id: order.id,
          status: order.status,
          payment_type: order.payment_type,
          delivery_type: order.delivery_type,
          created_at: order.createdAt,
          address: order.address,
          phone: order.phone,
          pickup: order.pickup,
        };

        // Get payment details
        if (order.payment_type === 'online' && order.session_id) {
          try {
            const session = await stripe.checkout.sessions.retrieve(order.session_id);
            orderData.payment_status = session.payment_status;
            orderData.amount_total = session.amount_total / 100;
          } catch (error) {
            strapi.log.error('Stripe error:', error);
          }
        } else {
          // Calculate total for cash orders
          let total = 0;
          for (const item of order.cart || []) {
            const varient = await strapi.db.query('api::varient.varient').findOne({
              where: { id: item.id },
              select: ['price'],
            });
            if (varient) {
              total += varient.price * item.qty;
            }
          }
          
          if (order.pickup) {
            total += order.delivery_type === 'pickup' 
              ? order.pickup.pickup_price 
              : order.pickup.home_price;
          }
          
          orderData.amount_total = total;
          orderData.payment_status = 'unpaid';
        }

        orderData.items_count = order.cart?.length || 0;
        ordersWithDetails.push(orderData);
      }

      return ordersWithDetails;
    } catch (error) {
      strapi.log.error('Get user orders error:', error);
      return ctx.badRequest('Failed to fetch orders');
    }
  },

  async updateStatus(ctx) {
    try {
      const user = ctx.state.user;
      const { orderId } = ctx.params;
      const { status, notes } = ctx.request.body;

      // Only admins can update order status
      if (!user || user.type !== 1) {
        return ctx.forbidden('Only admins can update order status');
      }

      const validStatuses = ['initiated', 'processed', 'shipped', 'delivered', 'cancelled'];
      
      if (!validStatuses.includes(status)) {
        return ctx.badRequest('Invalid status');
      }

      const order = await strapi.entityService.update('api::order.order', orderId, {
        data: {
          status,
          admin_notes: notes,
          updatedAt: new Date(),
        },
      });

      return order;
    } catch (error) {
      strapi.log.error('Update order status error:', error);
      return ctx.badRequest('Failed to update order status');
    }
  },
};
