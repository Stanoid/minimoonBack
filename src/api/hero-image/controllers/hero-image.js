'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hero-image.hero-image', ({ strapi }) => ({
  async find(ctx) {
    // Get active hero images ordered by order field
    const entities = await strapi.entityService.findMany('api::hero-image.hero-image', {
      filters: { is_active: true },
      sort: { order: 'asc' },
      populate: ['image'],
      publicationState: 'live',
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },
}));
