// @ts-nocheck
'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({









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
            where:{

              vendor:{
                id:regid
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

              offset:parseInt(query.page),
              limit:12,
              select: ["*"],
              populate: ["varients","varients.size","varients.color","subcatagory","seller"],
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
            populate: ["varients","subcatagory","seller"],
          });

          const sanitizedEntity = await this.sanitizeOutput(res, ctx);
          return sanitizedEntity;
          break;



          case "getFullProduct":

          const entity = await strapi.service("api::product.product").findOne(id, {
            select: ["*"],
            populate: ["varients","varients.color","varients.size","subcatagory","subcatagory.catagory"],
            });
            // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            // return this.transformResponse(sanitizedEntity);
            return entity;

          break;

          case "getProductVariants":

            const entityb = await strapi.service("api::product.product").findOne(id, {
                select: ["*"],
                populate: ["varients","varients.size","varients.color"],
              });
              const sanitizedEntityb = await this.sanitizeOutput(entityb, ctx);

              return sanitizedEntityb;

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

        const entity = await strapi.service("api::product.product").findOne(id, {
          select: ["*"],
          populate: ["varients","varients.color","varients.size","subcatagory","subcatagory.catagory"],
          });
          const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

          return this.transformResponse(sanitizedEntity);

        break;

        case "getProductVariants":

          const entityb = await strapi.service("api::product.product").findOne(id, {
              select: ["*"],
              populate: ["varients","varients.size","varients.color"],
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
    udata.id,

    );

     const utype = user.type


     var url = require("url");
     var url_parts = url.parse(ctx.request.url, true);
     var query = url_parts.query;
     switch (query.func) {
       case "AddProduct":
//console.log("Ssss",utype);

       if(utype==1){
        const {nameen,namear,descen,descar,subc,color,size,stock,price,imgs} = ctx.request.body;
        const entry = await strapi.entityService.create('api::varient.varient', {
          data: {
            price:price,
            stock:stock,
            color:color,
            size: size,
            publishedAt :  Date.now() ,
          },
        });

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


      return productentry


       }else{
         return "unauthorized (:";
       }


         break;



          default:
        return "no function selected"

         break;
     }
  } else {
    return "unauthorized access."
   }
  },



  async update(ctx) {
    const { id } = ctx.params;


    console.log("aaaaaaaaa",id)

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

       case "EditProduct":
       if(utype==1){

        const {nameen,namear,descen,descar,subc,varients} = ctx.request.body;


        console.dir(varients);

      let varray = []
        for (const key in varients) {
          if (Object.hasOwnProperty.call(varients, key)) {
        if(varients[key].id){

       varray.push(varients[key].id)

        }else{

      const entry = await strapi.entityService.create('api::varient.varient', {
            data: {
              price:varients[key].attributes.price,
              stock:varients[key].attributes.stock,
              color:varients[key].attributes.color.id,
              size: varients[key].attributes.size.id,
              publishedAt :  Date.now() ,
            },
          });
        const verid = entry.id;
        varray.push(verid);



        }

          }
        }



     // console.log(imgs);
      const productentry = await strapi.entityService.update('api::product.product',id, {

      data: {
          status:true,
          name_ar:namear,
          name_en:nameen,
          description_ar:descar,
          description_en: descen,
          varients: varray,
          subcatagory:subc,
          updatedAt: Date.now()
        },
      });

      return productentry

       }else{
         return "unauthorized (:";
       }
        break;



          default:
        return "no function selected"

         break;
     }
  } else {
    return "unauthorized access."
   }
  },


 }));
