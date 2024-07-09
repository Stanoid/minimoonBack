'use strict';

/**
 * color controller
 */
var url = require("url");
const varient = require("../../varient/controllers/varient");
const exp = require("constants");
require("dotenv").config()
const { createCoreController } = require('@strapi/strapi').factories;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = createCoreController('api::order.order', ({ strapi }) => ({


  //  async getPrice (id){

  //   const entity = await  strapi
  //   .service("api::varient.varient")
  //   .findOne(id, {
  //     select: ["*"],
  //   });

  //  return parseInt(entity.price);

  // },

getTimeStamp (dtt){
  var d = new Date(dtt);

  var timeStamp = d.getTime();
  return timeStamp;
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
     const {      code,
                  discount,
                  isfirsttran,
                  isminamount,
                  minorder,
                  expiry,
                  name,
                  exp_date,
                  redeems
     } = ctx.request.body;
     var url_parts = url.parse(ctx.request.url, true);
     var query = url_parts.query;
     switch (query.func) {
       case "AddPromoCode":
       if(utype==1){
        // const {name_ar,} = ctx.request.body;
        const coupon = await stripe.coupons.create({
          duration: "repeating",
          name:name,
          duration_in_months: 12,
          percent_off: discount,
        });



        const promotionCode = await stripe.promotionCodes.create({
          coupon: coupon.id,
          code: code,
          expires_at: expiry==1?exp_date:null,
          max_redemptions: expiry==2?redeems:null,
          restrictions:{
            first_time_transaction:isfirsttran,
            minimum_amount:isminamount?minorder:null,
            minimum_amount_currency:"sar",
          }


        });
  return promotionCode;



// const coupon = await stripe.coupons.retrieve('jMT0WJUD');
       }else{
         return "unauthorized (:";
       }
         break;
         case "listpromo":
       if(utype==1){
         const {size,} = ctx.request.body;
        const coupons = await stripe.coupons.list({
        limit:size,
        });
  return coupons;
// const coupon = await stripe.coupons.retrieve('jMT0WJUD');
       }else{
         return "unauthorized (:";
       }
         break;








          default:
        return "no function selected"
         break;
     }
      try {
      } catch (err) {
        return "nauthorized request catch triggred";
      }
  } else {

    const {items} = ctx.request.body;
    var url_parts = url.parse(ctx.request.url, true);
       var query = url_parts.query;
       switch (query.func) {
         case "initPaymentSession":

         try {

        var lineitems = []

        for (let i = 0; i < items.length; i++) {
        //Varient approach
    //       const entity = await  strapi
    // .service("api::varient.varient")
    // .findOne(items[i].id, {
    //   select: ["*"],
    // });

    // console.log(entity);
  let price = 0;

  console.log(items[i]);
    //Product approach
    const ressub = await strapi.db
    .query("api::product.product")
    .findOne({
      select: ["*"],
      where: {
        varients: {
          id: items[i].id,
        },
      },
      populate: [
        "varients",
      ],
    });

    console.dir(ressub.varients);
    for (let j = 0; j < ressub.varients.length; j++) {

      if(ressub.varients[j].id == items[i].id){
        console.log(ressub.varients[j]);
        price = ressub.varients[j].price
      }

    }



    lineitems.push({
      adjustable_quantity:{enabled:true},

      price_data: {
        currency: "sar",
        product_data: {
          name: ressub.name_en,
          description:ressub.description_en
        },
         unit_amount: parseInt(price*100)  ,
      },
      quantity: items[i].qty,
    })



        }




          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items:lineitems,
            allow_promotion_codes: true,
            shipping_address_collection:{allowed_countries:["HK","SA","ET"]},
            phone_number_collection:{enabled:true},
            expires_at: Math.floor(Date.now() / 1000) + (3600 * 2),
            success_url: `${process.env.CLIENT_URL}/payment`,
            cancel_url: `${process.env.CLIENT_URL}/paymentFailed`
          });


          const entry = await strapi.entityService.create(
            "api::order.order",
            {
              data: {
                items: session,
                status: "initiated",
                publishedAt: Date.now(),
              },
            }
          )
          console.log(entry)




          return ({ url: session.url })
        } catch (e) {
          // res.status(500).json({ error: e.message })

            console.log(e.message)
        }


          break;
          case "webhook":
            const {event} = ctx.request.body;
          switch (event.type) {
            case 'payment_intent.succeeded':
              const paymentIntent = event.data.object;
              // Then define and call a method to handle the successful payment intent.
              // handlePaymentIntentSucceeded(paymentIntent);
              break;
            case 'payment_method.attached':
              const paymentMethod = event.data.object;
              // Then define and call a method to handle the successful attachment of a PaymentMethod.
              // handlePaymentMethodAttached(paymentMethod);
              break;
            // ... handle other event types
            default:
              console.log(`Unhandled event type ${event.type}`);
          }

            break;
            case "testsession":
              const session = await stripe.checkout.sessions.retrieve(
                'cs_test_b14Olxz3Ox7CDNXK0Cw0zYLdRKtvg7u3LpepbgVSJg4uV0LngwuW9LBSvr'
              );

              return session;
              break;

          default:
            return "Defaulted ):"

   }



  }
  },

//   async update(ctx) {



//     const { id } = ctx.params;

//     if (ctx.request && ctx.request.header && ctx.request.header.authorization) {



//       const udata = await strapi.plugins[
//         "users-permissions"
//       ].services.jwt.getToken(ctx);

//      udata.id;


//      const user = await strapi.entityService.findOne(
//       "plugin::users-permissions.user",
//     udata.id,

//     );
//      const utype = user.type
//      var url = require("url");
//      var url_parts = url.parse(ctx.request.url, true);
//      var query = url_parts.query;
//      switch (query.func) {
//        case "EditColor":
// //console.log("Ssss",utype);

//        if(utype==1){
//         const {name_ar,name_en,colorCode} = ctx.request.body;

//         const coloredit = await strapi.entityService.update('api::order.order',id, {

//           data: {
//               status:true,
//               name_ar:name_ar,
//               name_en:name_en,
//               colorCode:colorCode,
//               updatedAt: Date.now()
//             },
//           });


//   return coloredit

//        }else{
//          return "unauthorized (:";
//        }
//          break;
//           default:
//         return "no function selected"
//          break;
//      }
//       // try {
//       // } catch (err) {
//       //   return "nauthorized request catch triggred";
//       // }
//   } else {
//     //puplic functions goes here
//     return "unauthorized access."
//    }





//   },

}));

