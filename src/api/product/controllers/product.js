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
            offset: parseInt(query.page),
            limit: 12,
            select: ["*"],
            populate: [
              "varients",
              "varients.size",
              "varients.color",
              "subcatagory",
              "seller",
            ],
          });

          const sanitizedEntity = await this.sanitizeOutput(resp, ctx);
          return sanitizedEntity;
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
            // limit:12,
            select: ["*"],
            populate: ["varients", "subcatagory", "seller"],
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
            where: {
              name_en: {
                $containsi: query.keyword,
              },
            },
            select: ["name_ar", "name_en", "id"],
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
                "varients.color",
                "varients.size",
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
              populate: ["varients", "varients.size", "varients.color"],
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
                "subcatagory",
                "subcatagory.catagory",
                "seller",
              ],
            });

          const sanitizedEntitysub = await this.sanitizeOutput(ressub, ctx);
          return sanitizedEntitysub;

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
              "varients.color",
              "varients.size",
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
            populate: ["varients", "varients.size", "varients.color"],
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
          //console.log("Ssss",utype);

          if (utype == 1) {
            const {
              nameen,
              namear,
              descen,
              descar,
              subc,
              color,
              size,
              stock,
              price,
              imgs,
            } = ctx.request.body;



            const product = await stripe.products.create({
              name: nameen,
              description:descen,
            });




            const entry = await strapi.entityService.create(
              "api::varient.varient",
              {
                data: {
                  price: price,
                  product_ref:product.id,
                  stock: stock,
                  color: color,
                  size: size,
                  publishedAt: Date.now(),
                },
              }
            );

            const verid = entry.id;

            console.log(imgs);

            const productentry = await strapi.entityService.create('api::product.product', {
              data: {
                status:true,
                name_ar:namear,
                name_en:nameen,
                description_ar:descar,
                description_en: descen,
                varients: verid,
                subcatagory:subc,
                seller: udata.id,
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

    console.log("aaaaaaaaa", id);

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
              descar,
              subc,
              varients,
              vartoDelete,
            } = ctx.request.body;

            //    console.dir(varients);
            let newvar = [];
            let varray = [];
            for (const key in varients) {
              if (Object.hasOwnProperty.call(varients, key)) {
                if (varients[key].id) {
                  varray.push(varients[key].id);
                  newvar.push(varients[key].id);
                } else {


                  const product = await stripe.products.create({
                    name: nameen,
                    description:descen,
                  });

                  const entry = await strapi.entityService.create(
                    "api::varient.varient",
                    {
                      data: {
                        price: varients[key].attributes.price,
                        product_ref:product.id,
                        stock: varients[key].attributes.stock,
                        color: varients[key].attributes.color.id,
                        size: varients[key].attributes.size.id,
                        publishedAt: Date.now(),
                      },
                    }
                  );
                  const verid = entry.id;
                  varray.push(verid);
                }
              }
            }

            // console.log(imgs);
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
                  varients: varray,
                  subcatagory: subc,
                  updatedAt: Date.now(),
                },
              }
            );

            console.log("from front", vartoDelete);
            console.log("new var array ", newvar);

            let toDelete = [];

            for (let i = 0; i < vartoDelete.length; i++) {
              if (newvar.includes(vartoDelete[i])) {
              } else {
                toDelete.push(vartoDelete[i]);
              }

              //  for (let j = 0; j < newvar.length; j++) {

              //   if(vartoDelete[i]==newvar[j]){

              //   }else{
              //   toDelete.push(vartoDelete[i])
              //   }

              //  }
            }

            console.log("to delete", toDelete);




            for (let x = 0; x < toDelete.length; x++) {



              const entity = await strapi
              .service("api::varient.varient")
              .findOne(toDelete[x], {
                select: ["*"],
                populate: [],
              });


           const deleted = await stripe.products.del(entity.product_ref);

           deleted;


              const deleteVars = await strapi.entityService.delete(
                "api::varient.varient",
                toDelete[x],
                {}
              );

              deleteVars;




            }

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

        default:
          return "no function selected";

          break;
      }
    } else {
      return "unauthorized access.";
    }
  },
}));
