'use strict';

/**
 * section controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::like.like', ({ strapi }) => ({

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



      case "AddToLikes":
        // return query.sid;
        const {pid} = ctx.request.body;



        const entry = await strapi.entityService.create('api::like.like', {
          data: {
            users_permissions_user: udata.id,
            status: true,
            products:pid,
            publishedAt :  Date.now() ,
          },
        });
  return entry
           break;


           case "removeLike":
            // return query.sid;
            const {id} = ctx.request.body;



            // const like = await strapi.entityService.create('api::like.like', {
            //   data: {
            //     users_permissions_user: udata.id,
            //     status: true,
            //     products:pid,
            //     publishedAt :  Date.now() ,
            //   },
            // });
            const like = await strapi.entityService.delete(
              "api::like.like",
             id,
              {}
            );


      return like
               break;


          default:
        return "noo function selected"
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

        case "getLikes":

  const ressubp = await strapi.db
  .query("api::like.like")
  .findMany({
    select: ["*"],
    where: {
      users_permissions_user: regid,

    },
    populate: [
      'products',"products.varients"
    ],
  });
  return ressubp;
           break;



      }
    } else {

      var url_parts = url.parse(ctx.request.url, true);
      var query = url_parts.query;
      switch (query.func) {





            case "getAllSubcat":
              // return query.sid;
                 const res = await strapi.db.query("api::section.section").findMany({
                   select: ["*"],
                     populate: ["catagories","catagories.subcatagories","img"],
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
//

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
        return "noo function selected"
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
