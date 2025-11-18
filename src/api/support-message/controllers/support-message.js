'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::support-message.support-message', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    
    if (!user) {
      return ctx.unauthorized('You must be logged in to send a message');
    }

    const { subject, message, order } = ctx.request.body.data;

    const entity = await strapi.entityService.create('api::support-message.support-message', {
      data: {
        user: user.id,
        subject,
        message,
        order,
        status: 'open',
        publishedAt: new Date(),
      },
    });

    return this.transformResponse(entity);
  },

  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    // Regular users see only their messages
    if (user.type !== 1) {
      ctx.query.filters = {
        ...ctx.query.filters,
        user: { id: user.id },
      };
    }

    const entities = await strapi.entityService.findMany('api::support-message.support-message', {
      ...ctx.query,
      populate: ['user', 'order', 'replied_by'],
    });

    return this.transformResponse(entities);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    // Only admins can update (reply to) messages
    if (user.type !== 1) {
      return ctx.forbidden('Only admins can reply to messages');
    }

    const { admin_reply, status } = ctx.request.body.data;

    const entity = await strapi.entityService.update('api::support-message.support-message', id, {
      data: {
        admin_reply,
        status,
        replied_at: new Date(),
        replied_by: user.id,
      },
    });

    return this.transformResponse(entity);
  },
}));
