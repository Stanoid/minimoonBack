const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

module.exports = {
  /**
   * Get all colors with caching
   */
  async getColors(strapi) {
    const cacheKey = 'all_colors';
    let colors = cache.get(cacheKey);
    
    if (!colors) {
      colors = await strapi.db.query("api::color.color").findMany({
        select: ["*"],
      });
      cache.set(cacheKey, colors);
    }
    
    return colors;
  },

  /**
   * Get all sizes with caching
   */
  async getSizes(strapi) {
    const cacheKey = 'all_sizes';
    let sizes = cache.get(cacheKey);
    
    if (!sizes) {
      sizes = await strapi.db.query("api::size.size").findMany({
        select: ["*"],
      });
      cache.set(cacheKey, sizes);
    }
    
    return sizes;
  },

  /**
   * Get all pickups with caching
   */
  async getPickups(strapi) {
    const cacheKey = 'all_pickups';
    let pickups = cache.get(cacheKey);
    
    if (!pickups) {
      pickups = await strapi.db.query("api::pickup.pickup").findMany({
        select: ["*"],
      });
      cache.set(cacheKey, pickups);
    }
    
    return pickups;
  },

  /**
   * Build product filters
   */
  buildProductFilters(query) {
    const { subcatid, catid, priceRange, colors, sizes } = query;
    const filters = {};
    const varientFilters = {};

    // Category/Subcategory filters
    if (subcatid && catid) {
      filters.subcatagory = {
        id: subcatid,
        catagory: { id: catid },
      };
    } else if (subcatid) {
      filters.subcatagory = { id: subcatid };
    } else if (catid) {
      filters.subcatagory = {
        catagory: { id: catid },
      };
    }

    // Price range filter
    if (priceRange && typeof priceRange === "string" && priceRange.includes(",")) {
      const [minPrice, maxPrice] = priceRange.split(",").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        varientFilters.price = { $gte: minPrice, $lte: maxPrice };
      }
    }

    // Color filter
    if (colors && typeof colors === "string") {
      const colorArray = colors.split(",").map((c) => parseInt(c)).filter(Boolean);
      if (colorArray.length) {
        varientFilters.colors = {
          id: { $in: colorArray },
        };
      }
    }

    // Size filter
    if (sizes && typeof sizes === "string") {
      const sizeArray = sizes.split(",").map((s) => parseInt(s)).filter(Boolean);
      if (sizeArray.length) {
        varientFilters.sizes = {
          id: { $in: sizeArray },
        };
      }
    }

    if (Object.keys(varientFilters).length > 0) {
      filters.varients = varientFilters;
    }

    return filters;
  },

  /**
   * Sort products
   */
  sortProducts(products, sortBy) {
    if (sortBy === "priceAsc") {
      products.sort((a, b) => {
        const priceA = a.varients?.[0]?.price || 0;
        const priceB = b.varients?.[0]?.price || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "priceDesc") {
      products.sort((a, b) => {
        const priceA = a.varients?.[0]?.price || 0;
        const priceB = b.varients?.[0]?.price || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "newest") {
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    return products;
  },

  /**
   * Clear cache
   */
  clearCache() {
    cache.flushAll();
  },
};
