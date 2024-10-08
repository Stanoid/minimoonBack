'use strict';

/**
 * color controller
 */
var url = require("url");
const varient = require("../../varient/controllers/varient");
const exp = require("constants");
const product = require("../../product/controllers/product");
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


         case "expireOrder":
        const {id} = ctx.request.body;


        const session = await stripe.checkout.sessions.expire(id);

        return session;
        break;

        case "getUserOrders" :
        // user.id alreadey present, get userorders
        const uorders = await strapi.db
  .query("api::order.order")
  .findMany({
    orderBy:[{ publishedAt: 'desc' }],
    limit:10,
    select: ["*"],
    where: {
      users_permissions_user: {
        id: udata.id,
      },
      //product_ref:lineItems.data[i].price.product
    },
    populate: [

    ],
  });

  let orary = []
  //
     for (let i = 0; i < uorders.length; i++) {
       let ordob = {}
      const session = await stripe.checkout.sessions.retrieve(uorders[i].session_id);

      if(session.status!="expired"){

     ordob.date = session.created;
   ordob.url = session.url;
     ordob.status = uorders[i].status;
     ordob.id = uorders[i].id;

     ordob.refId = session.id;
     ordob.total = session.amount_total / 100;
     ordob.payment_status = session.payment_status;
     orary.push(ordob);
    }

     }
  return orary.reverse();



        break;


        case "initPaymentSession":
          const {items} = ctx.request.body;

          console.log("items",items)

        try {

       var lineitems = []

       for (let i = 0; i < items.length; i++) {
       //Varient approach
   //       const entity = await  strapi
   // .service("api::varient.varient")
   // .findOne(items[i].id, {
   //   select: ["*"],
   // });

   //
 let price = 0;
 let id = null;


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

       price = ressub.varients[j].price;
       id = ressub.varients[j].id;
     }

   }




// const createPrice = await stripe.prices.create({
//  currency: 'sar',
//  unit_amount: parseInt(price*100),
//  product_data: {
//   metadata:{pid:items[i].id},
//    name: ressub.name_ar,


//  },
// });



   lineitems.push({
     adjustable_quantity:{enabled:true,maximum:5},
     price_data: {
       currency: "sar",
       product:items[i].product_ref,

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
           expires_at: Math.floor(Date.now() / 1000) + (3600 * 24),
           success_url: `${process.env.CLIENT_URL}/payment`,
           cancel_url: `${process.env.CLIENT_URL}/user`
         });


         const entry = await strapi.entityService.create(
           "api::order.order",
           {
             data: {
               items: session,
               cart: items ,
               users_permissions_user:user.id ,
               session_id:session.id,
               status: "initiated",
               publishedAt: Date.now(),
             },
           }
         )

         entry;





         return ({ url: session.url })
       } catch (e) {
         // res.status(500).json({ error: e.message })
console.log(e.message)

       }


         break;


   case "getOrders" :

   // validate list from orders with stripe checkout retrive1

   const ressub = await strapi.db
   .query("api::order.order")
   .findMany({
     select: ["*"],
   });

   let ordarray = []

   for (let i = 0; i < ressub.length; i++) {
    const session = await stripe.checkout.sessions.retrieve(ressub[i].session_id);

    if(session.status!="expired"){

    ordarray.push(session);
  }

   }



   //
return ordarray;
    break;


    case "deliverOrder":
      if(utype==1||utype==5){
       const {id} = ctx.request.body;
       const order = await strapi.entityService.update('api::order.order',id, {

         data: {
             status:"delivered",

           },
         });


 return order

      }else{
        return "unauthorized (:";
      }
        break;



    case "getDeliveryOrders" :

    // validate list from orders with stripe checkout retrive1

    const resdev = await strapi.db
    .query("api::order.order")
    .findMany({
      select: ["*"],

      populate:["users_permissions_user"]
    });

    let ordarraydev = []
 //
    for (let i = 0; i < resdev.length; i++) {
      let ordob = {}
     const session = await stripe.checkout.sessions.retrieve(resdev[i].session_id);

     if(session.status!="expired"&&session.payment_status=="paid"){
      ordob.name =  resdev[i].users_permissions_user.username;
    ordob.date = session.created;
    ordob.phone = session.customer_details.phone
    ordob.status = resdev[i].status;
    ordob.id = resdev[i].id;
    ordob.refId = session.id;
    ordob.email =  resdev[i].users_permissions_user.email;
    ordob.city = session.customer_details.address.city;
    ordob.line1 = session.customer_details.address.line1;
    ordob.line2 = session.customer_details.address.line2;
     ordarraydev.push(ordob);
   }

    }
 return ordarraydev;
     break;


     case "getAdminOrders" :

     // validate list from orders with stripe checkout retrive1

     const resdeva = await strapi.db
     .query("api::order.order")
     .findMany({
       select: ["*"],
       populate:["users_permissions_user"]
     });

     let ordarraydeva = []
  //
     for (let i = 0; i < resdeva.length; i++) {
       let ordob = {}
       console.log(resdeva[i])
      const session = await stripe.checkout.sessions.retrieve(resdeva[i].session_id);
      //console.log(session);
     //Card information in session object
     ordob.name =  resdeva[i].users_permissions_user.username;
     ordob.date = session.created;
     ordob.phone = session.customer_details&&session.customer_details.phone
     ordob.status = resdeva[i].status;
     ordob.id = resdeva[i].id;
     ordob.refId = session.id;
     ordob.email = resdeva[i].users_permissions_user.email;
     ordob.total = session.amount_total;
     ordob.currency = session.currency;
     ordob.payment_status = session.payment_status;
     ordob.city = session.customer_details&&session.customer_details.address.city;
     ordob.line1 = session.customer_details&&session.customer_details.address.line1;
     ordob.line2 = session.customer_details&&session.customer_details.address.line2;
      ordarraydeva.push(ordob);


     }
  return ordarraydeva;
      break;


     case "getOrderItems" :


      if(utype==1||utype==5||utype==4){
        const {id} = ctx.request.body;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          id
        );
   let returnArray = [];

for (let i = 0; i < lineItems.data.length; i++) {
  let ob = {};
  ob.qty = lineItems.data[i].quantity;
  const ressub = await strapi.db
  .query("api::varient.varient")
  .findMany({
    select: ["*"],
    where: {
      // subcatagory: {
      //   id: query.sid,
      // },
      product_ref:lineItems.data[i].price.product
    },
    populate: [
      "color","size"
    ],
  });

ob.colorEn = ressub[0].color.name_en;
ob.colorAr = ressub[0].color.name_ar;
ob.colorCode = ressub[0].color.colorCode;
ob.product_ref= ressub[0].product_ref;
ob.price = ressub[0].price;
ob.sizeNameEn = ressub[0].size.name_en;
ob.sizeNameAr = ressub[0].size.name_ar;
ob.sizeIcom = ressub[0].size.icon;



  const ressubp = await strapi.db
  .query("api::product.product")
  .findMany({
    select: ["*"],
    where: {
      varients: ressub[0].id,


    },
    populate: [
    ],
  });

ob.pid = ressubp[0].id;
ob.nameEn = ressubp[0].name_en;
ob.nameAr = ressubp[0].name_ar;
ob.imgs = ressubp[0].img;


  // console.dir(ressubp)
  // console.dir(ressub)
  // console.dir(lineItems);
returnArray.push(ob);

}


  return returnArray
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
       case "deliverOrder":
       if(utype==1||utype==5){
        const {id} = ctx.request.body;
        const order = await strapi.entityService.update('api::order.order',id, {

          data: {
              status:"delivered",

            },
          });


  return order

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

