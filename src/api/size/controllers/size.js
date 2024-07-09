'use strict';
// @ts-nocheck
/**
 * size controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::size.size', ({ strapi }) => ({

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
       case "AddSize":
//console.log("Ssss",utype);

       if(utype==1){
        const {name_ar,name_en,icon,status} = ctx.request.body;


        const entry = await strapi.entityService.create('api::size.size', {
          data: {
            name_ar:name_ar,
            name_en:name_en,
            icon:icon,
            status: status,
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
       case "EditSize":
//console.log("Ssss",utype);

       if(utype==1){
        const {name_ar,name_en,icon,status} = ctx.request.body;

        const sizeedit = await strapi.entityService.update('api::size.size',id, {

          data: {
              status:true,
              name_ar:name_ar,
              name_en:name_en,
              icon:icon,
              updatedAt: Date.now()
            },
          });


  return sizeedit

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
