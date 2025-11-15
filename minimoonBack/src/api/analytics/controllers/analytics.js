'use strict';

module.exports = {
  async getDashboard(ctx) {
    try {
      const user = ctx.state.user;

      // Only admins can access analytics
      if (!user || user.type !== 1) {
        return ctx.forbidden('Access denied');
      }

      // Get date range from query or default to last 30 days
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      // Total orders
      const totalOrders = await strapi.db.query('api::order.order').count({
        where: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      });

      // Processed orders
      const processedOrders = await strapi.db.query('api::order.order').count({
        where: {
          status: 'processed',
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      });

      // Pending orders
      const pendingOrders = await strapi.db.query('api::order.order').count({
        where: {
          status: 'initiated',
        },
      });

      // Get all processed orders for revenue calculation
      const orders = await strapi.db.query('api::order.order').findMany({
        where: {
          status: 'processed',
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        select: ['cart', 'delivery_type', 'pickup'],
        populate: ['pickup'],
      });

      // Calculate total revenue
      let totalRevenue = 0;
      for (const order of orders) {
        let orderTotal = 0;
        
        // Calculate cart total
        for (const item of order.cart || []) {
          const varient = await strapi.db.query('api::varient.varient').findOne({
            where: { id: item.id },
            select: ['price'],
          });
          if (varient) {
            orderTotal += varient.price * item.qty;
          }
        }

        // Add delivery cost
        if (order.pickup) {
          orderTotal += order.delivery_type === 'pickup' 
            ? order.pickup.pickup_price 
            : order.pickup.home_price;
        }

        totalRevenue += orderTotal;
      }

      // Low stock products
      const lowStockProducts = await strapi.db.query('api::varient.varient').findMany({
        where: {
          stock: {
            $lte: 10,
          },
        },
        limit: 10,
        populate: ['colors', 'sizes'],
      });

      // Get product IDs for low stock items
      const lowStockCount = await strapi.db.query('api::varient.varient').count({
        where: {
          stock: {
            $lte: 10,
          },
        },
      });

      // Total products
      const totalProducts = await strapi.db.query('api::product.product').count();

      // Active products
      const activeProducts = await strapi.db.query('api::product.product').count({
        where: { status: true },
      });

      // Open support messages
      const openSupportMessages = await strapi.db.query('api::support-message.support-message').count({
        where: {
          status: {
            $in: ['open', 'in_progress'],
          },
        },
      });

      return {
        summary: {
          totalOrders,
          processedOrders,
          pendingOrders,
          totalRevenue: Math.round(totalRevenue),
          totalProducts,
          activeProducts,
          lowStockCount,
          openSupportMessages,
        },
        lowStockProducts,
        dateRange: {
          start: startDate,
          end: endDate,
        },
      };
    } catch (error) {
      strapi.log.error('Dashboard error:', error);
      return ctx.badRequest('Failed to fetch dashboard data');
    }
  },

  async getSalesReport(ctx) {
    try {
      const user = ctx.state.user;

      if (!user || user.type !== 1) {
        return ctx.forbidden('Access denied');
      }

      const { startDate, endDate, groupBy = 'day' } = ctx.query;

      const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const end = endDate ? new Date(endDate) : new Date();

      const orders = await strapi.db.query('api::order.order').findMany({
        where: {
          status: 'processed',
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
        select: ['createdAt', 'cart', 'delivery_type', 'pickup'],
        populate: ['pickup'],
      });

      // Group sales by date
      const salesByDate = {};

      for (const order of orders) {
        const date = new Date(order.createdAt);
        const dateKey = date.toISOString().split('T')[0];

        if (!salesByDate[dateKey]) {
          salesByDate[dateKey] = {
            date: dateKey,
            orders: 0,
            revenue: 0,
          };
        }

        salesByDate[dateKey].orders += 1;

        // Calculate order total
        let orderTotal = 0;
        for (const item of order.cart || []) {
          const varient = await strapi.db.query('api::varient.varient').findOne({
            where: { id: item.id },
            select: ['price'],
          });
          if (varient) {
            orderTotal += varient.price * item.qty;
          }
        }

        if (order.pickup) {
          orderTotal += order.delivery_type === 'pickup' 
            ? order.pickup.pickup_price 
            : order.pickup.home_price;
        }

        salesByDate[dateKey].revenue += orderTotal;
      }

      const salesData = Object.values(salesByDate).sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );

      return {
        salesData,
        summary: {
          totalOrders: orders.length,
          totalRevenue: salesData.reduce((sum, day) => sum + day.revenue, 0),
          averageOrderValue: salesData.reduce((sum, day) => sum + day.revenue, 0) / orders.length || 0,
        },
      };
    } catch (error) {
      strapi.log.error('Sales report error:', error);
      return ctx.badRequest('Failed to fetch sales report');
    }
  },

  async getInventoryReport(ctx) {
    try {
      const user = ctx.state.user;

      if (!user || user.type !== 1) {
        return ctx.forbidden('Access denied');
      }

      const products = await strapi.db.query('api::product.product').findMany({
        populate: ['varients', 'varients.colors', 'varients.sizes', 'subcatagory'],
      });

      const inventoryData = [];

      for (const product of products) {
        for (const varient of product.varients || []) {
          inventoryData.push({
            productId: product.id,
            productName: product.name_en || product.name_ar,
            productCode: product.code,
            varientId: varient.id,
            color: varient.colors?.[0]?.name_en || 'N/A',
            size: varient.sizes?.[0]?.name_en || 'N/A',
            stock: varient.stock,
            price: varient.price,
            status: varient.stock <= 0 ? 'out_of_stock' : varient.stock <= 10 ? 'low_stock' : 'in_stock',
            subcategory: product.subcatagory?.name_en || 'N/A',
          });
        }
      }

      const summary = {
        totalVariants: inventoryData.length,
        inStock: inventoryData.filter(i => i.status === 'in_stock').length,
        lowStock: inventoryData.filter(i => i.status === 'low_stock').length,
        outOfStock: inventoryData.filter(i => i.status === 'out_of_stock').length,
        totalValue: inventoryData.reduce((sum, item) => sum + (item.stock * item.price), 0),
      };

      return {
        inventory: inventoryData,
        summary,
      };
    } catch (error) {
      strapi.log.error('Inventory report error:', error);
      return ctx.badRequest('Failed to fetch inventory report');
    }
  },

  async getTopProducts(ctx) {
    try {
      const user = ctx.state.user;

      if (!user || user.type !== 1) {
        return ctx.forbidden('Access denied');
      }

      const { limit = 10 } = ctx.query;

      const orders = await strapi.db.query('api::order.order').findMany({
        where: { status: 'processed' },
        select: ['cart'],
      });

      const productSales = {};

      for (const order of orders) {
        for (const item of order.cart || []) {
          if (!productSales[item.product_ref]) {
            productSales[item.product_ref] = {
              productId: item.product_ref,
              totalQuantity: 0,
              totalOrders: 0,
            };
          }
          productSales[item.product_ref].totalQuantity += item.qty;
          productSales[item.product_ref].totalOrders += 1;
        }
      }

      const topProducts = Object.values(productSales)
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, parseInt(limit));

      // Get product details
      for (const item of topProducts) {
        const product = await strapi.db.query('api::product.product').findOne({
          where: { id: item.productId },
          select: ['name_en', 'name_ar', 'code'],
          populate: ['images'],
        });
        item.product = product;
      }

      return topProducts;
    } catch (error) {
      strapi.log.error('Top products error:', error);
      return ctx.badRequest('Failed to fetch top products');
    }
  },
};
