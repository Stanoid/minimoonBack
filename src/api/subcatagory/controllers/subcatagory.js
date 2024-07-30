'use strict';

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
//console.log("Ssss",utype);

       if(utype==1){
        const {name_ar,name_en,catagory} = ctx.request.body;


        const entry = await strapi.entityService.create('api::subcatagory.subcatagory', {
          data: {
            name_ar:name_ar,
            name_en:name_en,
            status: true,
            catagory:catagory,
            publishedAt :  Date.now() ,
          },
        });
  return entry

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
                populate: ["products","products.varients","products.varients.color","products.subcatagory","products.seller"],
            });

            const sanitizedEntitysub = await this.sanitizeOutput(ressub, ctx);
            return sanitizedEntitysub;

            break;


            case "getAllSubcat":
              // return query.sid;
                 const res = await strapi.db.query("api::subcatagory.subcatagory").findMany({
                   select: ["*"],
                     populate: ["catagory"],
                 });

                 const sanitizedEntity = await this.sanitizeOutput(res, ctx);

             //   console.dir(res);
                 return sanitizedEntity;

                 break;



            default:

            return "Not a valid function name (: ";

            break;
      }
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
    udata.id,

    );
     const utype = user.type
     var url = require("url");
     var url_parts = url.parse(ctx.request.url, true);
     var query = url_parts.query;
     switch (query.func) {
       case "EditSubCat":
//console.log("Ssss",utype);

       if(utype==1){
        const {name_ar,name_en,catagory} = ctx.request.body;
        const subcatEdit = await strapi.entityService.update('api::subcatagory.subcatagory',id, {
          data: {
              status:true,
              name_ar:name_ar,
              name_en:name_en,
              catagory:catagory,
              updatedAt: Date.now()
            },
          });


  return subcatEdit

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
    //puplic functions goes here
    return "unauthorized access."
   }





  },




}));
