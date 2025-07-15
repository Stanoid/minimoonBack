// @ts-nocheck
"use strict";

const catagorie = require("../../catagorie/controllers/catagorie");
const subcatagory = require("../../subcatagory/controllers/subcatagory");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { parseMultipartData, sanitizeEntity } = require('@strapi/utils');

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    let regid = null;
    var url = require("url");

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      try {
        const udata = await strapi.plugins[
          "users-permissions"
        ].services.jwt.getToken(ctx);

        regid = udata.id;
      } catch (err) {
        return "unauthorized request catch triggred";
      }
      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
        case "getVendorProducts":
          const res = await strapi.db.query("api::product.product").findMany({
            where: {
              vendor: {
                id: regid,
              },
            },
            select: [
              "name",
              "description",
              "colors",
              "image",
              "updatedAt",
              "publishedAt",
            ],
            populate: [
              "stock",
              "catagories",
              "product.stocks",
              "vendor",
              "group",
            ],
          });

          // const sanitizedEntity = await this.sanitizeOutput(newres, ctx);
          return res;
          break;

        case "getAllProductsAdmin":
          const resp = await strapi.db.query("api::product.product").findMany({
            select: ["*"],
            populate: [
              "varients",
              "images",
              "varients.sizes",
              "varients.colors",
              "subcatagory",
              "seller",
            ],
          });

          //const sanitizedEntity = await this.sanitizeOutput(resp, ctx);
          return resp;
          break;

          case "getColorsAdmin":
            const respc = await strapi.db.query("api::color.color").findMany({
              select: ["*"],

            });
     return respc;
          break;

          case "getSizesAdmin":
            const resps = await strapi.db.query("api::size.size").findMany({
              select: ["*"],

            });
     return resps;
          break;
        default:
          return "Defaulting from Authed, You screwed up badly fam (: ";
          break;
      }
    } else {
      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
        case "getAllProducts":
          //console.log("paaaaaaaaaage",query.page)
          const res = await strapi.db.query("api::product.product").findMany({
             offset:parseInt(query.page * 24),
            limit:24,
            select: ["*"],
            populate: ["images","varients", "varients.colors", "subcatagory", "seller"],
          });

          const sanitizedEntity = await this.sanitizeOutput(res, ctx);
          return sanitizedEntity;
          break;


          case "getFlashOffers":
            //console.log("paaaaaaaaaage",query.page)
            const entries = await strapi.db.query('api::product.product').findMany({
              populate: ["varients", "varients.colors", "subcatagory", "seller"],
              limit: 10,

            });

            const sanitizedEntityf = await this.sanitizeOutput(entries, ctx);
            return sanitizedEntityf;
            break;

        case "SearchWithkeyword":
          const ress = await strapi.db.query("api::product.product").findMany({
            // fillters:{
            //  $or:{
            //   name_ar:{
            //     $containsi: query.keyword
            //   }
            //   ,
            //   {

            //   }
            //  }
            // },
            limit : 6,
            where: {
           $or:[
           { name_ar: {$containsi: query.keyword,}},
           { name_en: {$containsi: query.keyword,}},
           {
              code: {
                $containsi: query.keyword
              }
            }


           ]
            },
            select: ["name_ar", "name_en", "id","code"],

          });

          const sanitizedEntitys = await this.sanitizeOutput(ress, ctx);
          return sanitizedEntitys;
          break;




          case "getFullProduct":
            try {
              const id = query.id; // or use ctx.params.id if hitting a route like /products/:id

              if (!id) {
                return ctx.badRequest("Product ID is missing.");
              }

              const entity = await strapi.service("api::product.product").findOne(id, {
                select: ["*"],
                populate: [
                  "images",
                  "varients",
                  "varients.colors",
                  "varients.sizes",
                  "subcatagory",
                  "subcatagory.catagory",
                ],
              });

              if (!entity) {
                return ctx.notFound("Product not found");
              }

              const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
              return this.transformResponse(sanitizedEntity);
            } catch (err) {
              console.error("Error fetching product:", err);
              return ctx.internalServerError("Failed to fetch product.");
            }


            break;

        case "getProductVariants":
          const entityb = await strapi
            .service("api::product.product")
            .findOne(id, {
              select: ["*"],
              populate: ["varients", "varients.size", "varients.colors"],
            });
          const sanitizedEntityb = await this.sanitizeOutput(entityb, ctx);

          return sanitizedEntityb;

          break;



          case "getColorsFilter":
            const respFilterc = await strapi.db.query("api::color.color").findMany({
              select: ["*"],

            });
            console.log(respFilterc);
     return respFilterc;
          break;

          case "getSizesFilter":
            const respFilter = await strapi.db.query("api::size.size").findMany({
              select: ["*"],

            });
            console.log(respFilter);
     return respFilter;
          break;


          case "getTopSellerPerSubcat":
            const topSubcatid = query.subcatid;

            const orders = await strapi.db.query("api::order.order").findMany({
              where: { status: "processed" },
              select: ["cart"],
            });

            const productSalesMap = {};

            orders.forEach((order) => {
              const cart = Array.isArray(order.cart) ? order.cart : [];
              cart.forEach((item) => {
                if (!item.id) return;
                const id = item.id;
                const quantity = item.qty || 1;
                productSalesMap[id] = (productSalesMap[id] || 0) + quantity;
              });
            });

            const productIds = Object.keys(productSalesMap).map(Number);

            let allSoldProducts = await strapi.db.query("api::product.product").findMany({
              where: {
                id: { $in: productIds },
              },
              populate: ["subcatagory", "varients", "varients.colors"],
            });

            const productsWithSales = allSoldProducts.map((product) => ({
              ...product,
              totalSales: productSalesMap[product.id] || 0,
            }));

            const filteredProducts = topSubcatid
              ? productsWithSales.filter(
                  (p) => p.subcatagory && p.subcatagory.id == subcatid
                )
              : productsWithSales;

            const topProducts = filteredProducts
              .sort((a, b) => b.totalSales - a.totalSales)
              .slice(0, 4);

              console.log("Top Products:", topProducts.length);

            return topProducts;
break;

case "filterProducts":
  const {
    subcatid,
    catid,
    priceRange,
    sortBy,
    colors,
    sizes,
    page = 0,
    limit = 24,
  } = query;

  const filters = {};
const varientFilters = {};


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


if (priceRange && typeof priceRange === "string" && priceRange.includes(",")) {
  const [minPrice, maxPrice] = priceRange.split(",").map(Number);
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    varientFilters.price = { $gte: minPrice, $lte: maxPrice };
  }
}

if (colors && typeof colors === "string") {
  const colorArray = colors.split(",").map((c) => parseInt(c)).filter(Boolean);
  if (colorArray.length) {
    varientFilters.colors = {
      id: { $in: colorArray },
    };
  }
}


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


  const products = await strapi.db.query("api::product.product").findMany({

    where: filters.$and && filters.$and.length > 0 ? filters : {},

    offset: parseInt(page) * parseInt(limit),
    limit: parseInt(limit),
    populate: [
      "varients",
      "varients.colors",
      "varients.sizes",
      "subcatagory",
      "subcatagory.catagory",
      "seller",
    ],
  });

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

  const sanitizedProducts = await this.sanitizeOutput(products, ctx);

  console.log("Filtered Products:", sanitizedProducts.length);
  console.log("Filters Applied:", JSON.stringify(filters, null, 2));
  console.log("Sort By:", sortBy);

  return sanitizedProducts;
break;
        case "getProductswithSubid":
          // return query.sid;

          const ressub = await strapi.db
            .query("api::product.product")
            .findMany({
              select: ["*"],
              where: {
                subcatagory: {
                  id: query.sid,
                },
              },
              populate: [
                "varients",
                "varients.colors",
                "subcatagory",
                "subcatagory.catagory",
                "seller",
              ],
            });

          const sanitizedEntitysub = await this.sanitizeOutput(ressub, ctx);
          return sanitizedEntitysub;

          break;
          case "getPick":

          const respc = await strapi.db.query("api::pickup.pickup").findMany({
            select: ["*"],

          });
   return respc;

            break;


          case "getProductswithCatid":
            // return query.sid;

            const ressubo = await strapi.db
            .query("api::subcatagory.subcatagory")
            .findMany({
              where: {
                catagory: { id: query.cid },
              },
              populate: {
                img: true,
                images: true,
                products: {
                  populate: {
                    images: true,
                    varients: {
                      populate: {
                        colors: true,
                        size: true,
                      },
                    },
                    subcatagory: {
                      populate: {
                        catagory: true,
                      },
                    },
                  },
                },
              },
            });
          

            const sanitizedEntitysubo = await this.sanitizeOutput(ressubo, ctx);
            return sanitizedEntitysubo;

            break;

        default:
          return "Not a valid function name (: ";

          break;
      }
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    var url = require("url");
    var url_parts = url.parse(ctx.request.url, true);
    var query = url_parts.query;
    switch (query.func) {
      case "getFullProduct":
        const entity = await strapi
          .service("api::product.product")
          .findOne(id, {
            select: ["*"],
            populate: [
              "images",
              "varients",
              "varients.colors",
              "varients.sizes",
              "subcatagory",
              "subcatagory.catagory",
            ],
          });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);

        break;

      case "getProductVariants":
        const entityb = await strapi
          .service("api::product.product")
          .findOne(id, {
            select: ["*"],
            populate: ["varients", "varients.size", "varients.colors"],
          });
        const sanitizedEntityb = await this.sanitizeOutput(entityb, ctx);

        return sanitizedEntityb.varients;

        break;

      default:
        break;
    }
  },




  async create(ctx) {
    const { id } = ctx.params;

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      const udata = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);

      udata.id;

      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        udata.id
      );

      const utype = user.type;

      var url = require("url");
      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
  case "AddProduct":
    if (utype == 1) {
      let data, files;

      try {
        // Parse multipart or JSON data
        if (ctx.is("multipart")) {
          const multipartData = parseMultipartData(ctx);
          data = multipartData.data;
          files = multipartData.files;
        } else {
          data = ctx.request.body;
        }

        const {
          nameen,
          namear,
          descen,
          descar,
          code,
          subc,
          varients,
          imgs, // Include imgs field from the request body
        } = data;

        console.log("Received imgs:", imgs);

        // Validate required fields
        if (!nameen || !namear || !descen || !descar || !code || !subc || !varients) {
          return ctx.badRequest("Missing required fields.");
        }

        let idarray = [];
        let parsedVarients;

        // Parse variants
        try {
          parsedVarients = JSON.parse(varients);
        } catch (err) {
          console.error("Error parsing variants:", err);
          return ctx.badRequest("Invalid variants format.");
        }

        // Create variants
        for (let i = 0; i < parsedVarients.length; i++) {
          try {
            const entry = await strapi.entityService.create("api::varient.varient", {
              data: {
                price: parsedVarients[i].price,
                stock: parsedVarients[i].stock,
                old_price: parsedVarients[i].discount,
                colors: parsedVarients[i].color,
                sizes: parsedVarients[i].size,
                publishedAt: Date.now(),
              },
            });
            idarray.push(entry.id);
          } catch (err) {
            console.error(`Error creating variant ${i}:`, err);
            return ctx.internalServerError(`Failed to create variant ${i}.`);
          }
        }

        // Create product entry without images
        let productentry;
        try {
          productentry = await strapi.entityService.create("api::product.product", {
            data: {
              status: true,
              name_ar: namear,
              name_en: nameen,
              description_ar: descar,
              description_en: descen,
              varients: idarray,
              subcatagory: subc,
              seller: udata.id,
              code: code,
              publishedAt: Date.now(),
            },
          });

          console.log("Created product entry:", productentry);
        } catch (err) {
          console.error("Error creating product entry:", err);
          return ctx.internalServerError("Failed to create product entry.");
        }

        // Manually associate images with the product
        try {
          await strapi.entityService.update("api::product.product", productentry.id, {
            data: {
              images: imgs.map((img) => ({
                id: img.id,
              })),
            },
          });

          console.log("Images associated successfully.");

          // Query the product entry to ensure images are populated
          const updatedProduct = await strapi.entityService.findOne(
            "api::product.product",
            productentry.id,
            {
              populate: ["images"], // Ensure images are included in the response
            }
          );

          console.log("Updated product entry with images:", updatedProduct);
          return updatedProduct;
        } catch (err) {
          console.error("Error associating images:", err);
          return ctx.internalServerError("Failed to associate images.");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        return ctx.internalServerError("An unexpected error occurred.");
      }
    } else {
      return ctx.forbidden("Unauthorized access.");
    }
    break;

  default:
          return "no function selected";

          break;
      }
    } else {
      return "unauthorized access.";
    }
  },

  async update(ctx) {
    const { id } = ctx.params;



    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      const udata = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);
      udata.id;
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        udata.id
      );
      const utype = user.type;
      var url = require("url");
      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
        case "EditProduct":
          if (utype == 1) {
            const {
              nameen,
              namear,
              descen,
              price,
              stock,
              code,
              descar,
              color,
              size,
              subc,
              varient,
            } = ctx.request.body;

            //    console.dir(varients);
            let newvar = [];
            let varray = [];

            const varentity = await strapi.entityService.update(
              "api::varient.varient",
              varient,
              {
                data: {
                  price: price,
                 // product_ref: product.id,
                  stock: stock,
                  colors: color,
                  code:code,
                  sizes: size,
                },
              }
            );

            //
            const productentry = await strapi.entityService.update(
              "api::product.product",
              id,
              {
                data: {
                  status: true,
                  name_ar: namear,
                  name_en: nameen,
                  description_ar: descar,
                  description_en: descen,
                 // varients: varray,
                  subcatagory: subc,
                  updatedAt: Date.now(),
                },
              }
            );












            return productentry;
          } else {
            return "unauthorized (:";
          }
          break;

        case "EditStatus":
          if (utype == 1) {
            const { status } = ctx.request.body;

            const statusEntity = await strapi.entityService.update(
              "api::product.product",
              id,
              {
                data: {
                  status: status,
                },
              }
            );

            return statusEntity;
          } else {
            return "unauthorized (:";
          }
          break;


          case "editStock":
            if (utype == 1) {
              const { varient } = ctx.request.body;
              let edited =[];

              for (let i = 0; i < varient.length; i++) {
                const stockEntery = await strapi.entityService.update(
                  "api::varient.varient",
                  varient[i].id,
                  {
                    data: {
                     stock:varient[i].attributes.stock,
                     price:varient[i].attributes.price,
                     old_price:varient[i].attributes.old_price
                    },
                  }
                );


              edited.push(stockEntery)

              }





              return edited;
            } else {
              return "unauthorized (:";
            }
            break;





        default:
          return "no function selected";

          break;
      }
    } else {
      return "unauthorized access.";
    }
  },
}));
