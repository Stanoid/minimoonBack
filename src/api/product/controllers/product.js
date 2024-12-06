// @ts-nocheck
"use strict";

const catagorie = require("../../catagorie/controllers/catagorie");
const subcatagory = require("../../subcatagory/controllers/subcatagory");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

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
        default:
          return "Defaulting from Authed, You screwed up badly fam (: ";
          break;
      }
    } else {
      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {
        case "getAllProducts":
          const res = await strapi.db.query("api::product.product").findMany({
            // offset:parseInt(query.page),

            limit:20,
            select: ["*"],
            populate: ["varients", "varients.colors", "subcatagory", "seller"],
          });

          const sanitizedEntity = await this.sanitizeOutput(res, ctx);
          return sanitizedEntity;
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
          const entity = await strapi
            .service("api::product.product")
            .findOne(id, {
              select: ["*"],
              populate: [
                "varients",
                "varients.colors",
                "varients.sizes",
                "subcatagory",
                "subcatagory.catagory",
              ],
            });
          // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

          // return this.transformResponse(sanitizedEntity);
          return entity;

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


          case "getProductswithCatid":
            // return query.sid;

            const ressubo = await strapi.db
              .query("api::subcatagory.subcatagory")
              .findMany({
                select: ["*"],
                where: {
                catagory:{
                     id:query.cid
                    },
                },
                populate: ["products", "img",  "products.varients",
                  "products.varients.colors",
                  "products.varients.size",
                  "products.subcatagory",
                  "products.subcatagory.catagory"],
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
          //

          if (utype == 1) {
            const {
              nameen,
              namear,
              descen,
              descar,
              code,
              subc,
           varients,
              price,
              imgs,
            } = ctx.request.body;


            //uncomment for production
            const product = await stripe.products.create({
              name: nameen,
              description:descen,
            });


           let idarray = []
             for (let i = 0; i < varients.length; i++) {

              const entry = await strapi.entityService.create(
                "api::varient.varient",
                {
                  data: {
                    price: varients[i].price,
                    product_ref: product.id,
                    stock: varients[i].stock,
                    old_price:varients[i].discount,
                    colors: varients[i].color ,
                    sizes: varients[i].size,
                    publishedAt: Date.now(),
                  },
                }
              );

              idarray.push(entry.id)

             }



            //const verid = entry.id;



            const productentry = await strapi.entityService.create('api::product.product', {
              data: {
                status:true,
                name_ar:namear,
                name_en:nameen,
                description_ar:descar,
                description_en: descen,
                varients: idarray,
                subcatagory:subc,
                seller: udata.id,
                code:code,
                img: imgs,
                publishedAt :  Date.now() ,
              },
            });


            return productentry;

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
