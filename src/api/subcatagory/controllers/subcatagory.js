'use strict';

const catagorie = require('../../catagorie/controllers/catagorie');
const product = require('../../product/controllers/product');

/**
 * subcatagory controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subcatagory.subcatagory', ({ strapi }) => ({

  async create(ctx) {
    const { id } = ctx.params;

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {



      const udata = await strapi.plugins[
        "users-permissions"
      ].services.jwt.getToken(ctx);

     udata.id;


     const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
    udata.id,

    );

     const utype = user.type


     var url = require("url");
     var url_parts = url.parse(ctx.request.url, true);
     var query = url_parts.query;
     switch (query.func) {
      case "AddSubCat":
        if (utype == 1) {
          const { name_ar, name_en, catagory } = ctx.request.body;
          const { files } = ctx.request;

          let imageEntry = null;

          if (files && files.img) {
            // Handle array or single object
            const fileData = Array.isArray(files.img) ? files.img : [files.img];

            const uploaded = await strapi
              .plugin("upload")
              .service("upload")
              .upload({
                data: {},
                files: fileData,
              });

            if (uploaded.length > 0) {
              imageEntry = uploaded[0];
            }
          }

          const entry = await strapi.entityService.create(
            "api::subcatagory.subcatagory",
            {
              data: {
                name_ar,
                name_en,
                catagory,
                status: true,
                publishedAt: new Date(),
                ...(imageEntry ? { img: imageEntry.id } : {}),
              },
            }
          );

          return entry;
        } else {
          return "unauthorized (:";
        }
break;

case "setTopsec":
  if (!ctx.request?.header?.authorization) {
    ctx.status = 403;
    return { error: "Unauthorized access" };
  }

  const udata = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);
  const user = await strapi.entityService.findOne("plugin::users-permissions.user", udata.id);

  if (user.type !== 1) {
    ctx.status = 403;
    return { error: "Unauthorized" };
  }

  const subcatId = Number(ctx.query.id);
  const topsecStatus = ctx.query.topsec === "true";

  const updatedSubcat = await strapi.entityService.update(
    "api::subcatagory.subcatagory",
    subcatId,
    { data: { topsec: topsecStatus, updatedAt: new Date() } }
  );

  console.log("Topsec updated:", updatedSubcat);

  return this.sanitizeOutput(updatedSubcat, ctx);

  break;
}
      // try {
      // } catch (err) {
      //   return "nauthorized request catch triggred";
      // }
  } else {
    return "unauthorized access."
   }



  },







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

        //authed subcat acces goes here



      }
    } else {

      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
            case "getRelatedsubcats":
         // return query.sid;
            const ressub = await strapi.db.query("api::subcatagory.subcatagory").findMany({

              select: ["*"],

              where:{

                catagory:{
                  id:query.cid
                },

                },


                filters:{
                  $not:{
                    id:query.sid
                  }
                },
                populate: ["products","products.varients","products.varients.colors","products.subcatagory","products.seller"],
            });

            const sanitizedEntitysub = await this.sanitizeOutput(ressub, ctx);
            return sanitizedEntitysub;

            break;

            case "getTopSecSubcats":
              const topSubcats = await strapi.db.query("api::subcatagory.subcatagory").findMany({
                select: ["*"],
                where: { topsec: true, status: true }, // only active top section subcats
                populate: ["img", "catagory", "products"],
              });

              const sanitizedTopSubcats = await this.sanitizeOutput(topSubcats, ctx);
              return sanitizedTopSubcats;

              break;


            case "getSubCatProducts":
              const resp = await strapi.db.query("api::subcatagory.subcatagory").findMany({
                select: ["*"],
                where: {
                  feat: true,
                },
                populate: {
                  catagory: true,
                  products: {
                    populate: {
                      images: true,
                      varients: {
                        populate: {
                          colors: true,
                        },
                      },
                    },
                  },
                },
              });

              const limitedProducts = resp.map(subcat => ({
                ...subcat,
                products: subcat.products?.slice(0, 4) || [],
              }));

              const sanitizedEntityp = await this.sanitizeOutput(limitedProducts, ctx);
              return sanitizedEntityp;

break;

case "getAllSubcat":
  return await strapi.db.query("api::subcatagory.subcatagory").findMany({
    populate: {
      catagory: true,
      img: true,
    },
  });
  break;




                     case "getTopSubcats":
  const orders = await strapi.db.query("api::order.order").findMany({
    where: { status: "processed" },
    select: ["cart"],
  });

  const productSalesMap = {};

  orders.forEach((order) => {
    const cart = order.cart || [];
    cart.forEach((item) => {
      const id = item.id;
      const quantity = item.qty || 1;
      if (!productSalesMap[id]) productSalesMap[id] = 0;
      productSalesMap[id] += quantity;
    });
  });

  const productIds = Object.keys(productSalesMap).map((id) => Number(id));

  const products = await strapi.db.query("api::product.product").findMany({
    where: { id: { $in: productIds } },
    populate: ["subcatagory",
      //  "varients", "varients.colors"
      ],
  });

  const productsWithSales = products.map((product) => {
    const totalSales = productSalesMap[product.id] || 0;
    return { ...product, totalSales };
  });

  const subcategorySalesMap = {};

  productsWithSales.forEach((product) => {
    const subcategory = product.subcatagory;
    if (!subcategory) return;

    const subcatId = subcategory.id;

    if (!subcategorySalesMap[subcatId]) {
      subcategorySalesMap[subcatId] = {
        subcategory: subcategory,
        totalSales: 0,
        products: [],
      };
    }

    subcategorySalesMap[subcatId].totalSales += product.totalSales;
    subcategorySalesMap[subcatId].products.push(product);
  });

  const sortedSubcategories = Object.values(subcategorySalesMap)
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);
// console.log(sortedSubcategories.length);
  return sortedSubcategories;
            break;


            default:

            return "Not a valid function name (: ";

            break;
      }
    }
  },





  async update(ctx) {
    const { id } = ctx.params;

    if (!ctx.request?.header?.authorization) {
      ctx.status = 403;
      return { error: "Unauthorized access" };
    }

    const udata = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);
    const user = await strapi.entityService.findOne("plugin::users-permissions.user", udata.id);

    if (user.type !== 1) {
      ctx.status = 403;
      return { error: "Unauthorized" };
    }

    const body = ctx.request.body; // could be { name_ar, name_en, catagory, feat, topsec }

    let updateData = {
      ...body,
      updatedAt: new Date(),
    };

    // Handle image upload if present
    if (ctx.request.files?.img) {
      const files = Array.isArray(ctx.request.files.img) ? ctx.request.files.img : [ctx.request.files.img];
      try {
        const uploadedFiles = await strapi.plugin('upload').service('upload').upload({ data: {}, files });
        if (uploadedFiles.length > 0) updateData.img = uploadedFiles[0].id;
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }

    const updated = await strapi.entityService.update(
      'api::subcatagory.subcatagory',
      id,
      { data: updateData }
    );

    return this.sanitizeOutput(updated, ctx);
  },



}));
