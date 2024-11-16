'use strict';

/**
 * pickup service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pickup.pickup');
