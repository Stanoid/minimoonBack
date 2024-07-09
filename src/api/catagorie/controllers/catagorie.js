'use strict';

/**
 * catagorie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::catagorie.catagorie', ({ strapi }) => ({

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
       case "AddCat":
//console.log("Ssss",utype);

       if(utype==1){
        const {name_ar,name_en,status} = ctx.request.body;


        const entry = await strapi.entityService.create('api::catagorie.catagorie', {
          data: {
            name_ar:name_ar,
            name_en:name_en,
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
       case "EditCat":
//console.log("Ssss",utype);

       if(utype==1){
        const {name_ar,name_en} = ctx.request.body;


        const catEdit = await strapi.entityService.update('api::catagorie.catagorie',id, {

          data: {
              status:true,
              name_ar:name_ar,
              name_en:name_en,

              updatedAt: Date.now()
            },
          });


  return catEdit

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

