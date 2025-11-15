'use strict';


/**
 * color controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::color.color', ({ strapi }) => ({

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
       case "AddColor":


       if(utype==1){
        const {name_ar,name_en,colorCode} = ctx.request.body;

          console.log(name_ar,name_en,colorCode);


        const entry = await strapi.entityService.create('api::color.color', {
          data: {
            name_ar:name_ar,
            name_en:name_en,
            colorCode:colorCode,
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
       case "EditColor":
//

       if(utype==1){
        const {name_ar,name_en,colorCode} = ctx.request.body;

        const coloredit = await strapi.entityService.update('api::color.color',id, {

          data: {
              status:true,
              name_ar:name_ar,
              name_en:name_en,
              colorCode:colorCode,
              updatedAt: Date.now()
            },
          });


  return coloredit

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

