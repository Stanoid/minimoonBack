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

            offset:parseInt(query.page),
            limit:12,
            select: ["*"],
            populate: ["varients","subcatagory","seller"],
          });

          const sanitizedEntity = await this.sanitizeOutput(res, ctx);
          return sanitizedEntity;
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





      // try {



      // } catch (err) {
      //   return "nauthorized request catch triggred";
      // }







  } else {
    return "unauthorized access."
   }



  },







 }));
