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
    select: ["*"],
    where: {
      users_permissions_user: {
        id: udata.id,
      },
      //product_ref:lineItems.data[i].price.product
    },
    populate: [
    "pickup"
    ],
  });

  let orary = []
  //
     for (let i = 0; i < uorders.length; i++) {
       let ordob = {}




       if(uorders[i].payment_type=="online"){

        const session = await stripe.checkout.sessions.retrieve(uorders[i].session_id);

        if(session.status!="expired"){
      ordob.pickup = uorders[i].pickup;
       ordob.date = session.created;
       ordob.address = uorders[i].address;
       ordob.phone = uorders[i].phone;
     ordob.url = session.url;
       ordob.status = uorders[i].status;
       ordob.id = uorders[i].id;
     ordob.payment_type = uorders[i].payment_type;
     ordob.delivery_type = uorders[i].delivery_type;
       ordob.refId = session.id;
       ordob.total = session.amount_total / 100;
       ordob.payment_status = session.payment_status;

      }

       }else{
  let total_price=0;
  let delivery_price=0;

  if(uorders[i].delivery_type=="pickup"){
 delivery_price = uorders[i].pickup.pickup_price;
  }else{
   delivery_price = uorders[i].pickup.home_price;
  }

  const date = new Date(uorders[i].createdAt);

// Get the Unix timestamp in milliseconds
const timestampInMilliseconds = date.getTime();

// Convert milliseconds to seconds (Unix timestamp)
const unixTimestamp = timestampInMilliseconds / 1000;
        ordob.pickup = uorders[i].pickup;
        ordob.date = unixTimestamp;
        ordob.url = "pickup";
          ordob.status = uorders[i].status;
          ordob.id = uorders[i].id;
          ordob.address = uorders[i].address;
       ordob.phone = uorders[i].phone;
          ordob.payment_type = uorders[i].payment_type;
          ordob.delivery_type = uorders[i].delivery_type;
          ordob.refId = uorders[i].id;


       for (let j = 0; j < uorders[i].cart.length; j++) {
        let price = 0;
        let id = null;
          //Product approach
          const ressub = await strapi.db
          .query("api::varient.varient")
          .findOne({
            select: ["*"],
            where: {

                id: uorders[i].cart[j].id,

            },

          });
          console.dir(ressub);

          total_price = total_price + ressub.price * uorders[i].cart[j].qty;


          // for (let x = 0; x < ressub.varients.length; x++) {

          //   if(ressub.varients[x].id == uorders[i].cart[x].id){
          //     price = ressub.varients[j].price;
          //     id = ressub.varients[j].id;

          //   }

          // }




          // lineitems.push({
          //   price_data: {
          //     currency: "dzd",
          //     product:items[i].product_ref,

          //      unit_amount: parseInt(price*100)  ,
          //   },
          //   quantity: items[i].qty,
          // })



              }

           ordob.total = total_price + delivery_price;
           ordob.payment_status = "unpaid";

       }
       orary.push(ordob);



     }
  return orary.reverse();



        break;



        case "orderProccessor" :
          // user.id alreadey present, get userorders

          const {oid} = ctx.request.body;
          const orderp = await strapi.db
          .query("api::order.order")
          .findOne({
            select: ["*"],
            where: {
             id:oid
            },
            populate: [

            ],
          });

       if(orderp.status=="initiated"){

        if(orderp.payment_type=="online"){

          const sessionp = await stripe.checkout.sessions.retrieve(orderp.session_id);

        if(sessionp.payment_status=="paid"){
         // proccess order quantities;

       for (let i = 0; i < orderp.cart.length; i++) {
        const element = orderp.cart[i];

        const ressub = await strapi.db
        .query("api::varient.varient")
        .findOne({
          select: ["*"],
          where: {
           id: orderp.cart[i].id,
          },
          populate: [

          ],
        });

        const updateentry = await strapi.entityService.update('api::varient.varient', orderp.cart[i].id, {
          data: {
            stock: ressub.stock - orderp.cart[i].qty,
          },
        });


        console.log(updateentry);

       }

       const entry = await strapi.entityService.update('api::order.order',oid, {
        data: {
          status: "processed",
        },
        });

        entry;


        }



        }else{


          for (let i = 0; i < orderp.cart.length; i++) {
            const element = orderp.cart[i];

            const ressub = await strapi.db
            .query("api::varient.varient")
            .findOne({
              select: ["*"],
              where: {
               id: orderp.cart[i].id,
              },
              populate: [

              ],
            });

            const updateentry = await strapi.entityService.update('api::varient.varient', orderp.cart[i].id, {
              data: {
                stock: ressub.stock - orderp.cart[i].qty,
              },
            });


            console.log(updateentry);

           }

           const entry = await strapi.entityService.update('api::order.order',oid, {
            data: {
              status: "processed",
            },
            });

            entry;

        }



       }else{
        console.log("dublicated")
        // return null
       }






    return orderp;



          break;


        case "initPaymentSession":
          const {items,email,address,phone,state_id,delivery_method,payment_metod} = ctx.request.body;

          console.log("items",items)

        try {

       var lineitems = []

       for (let i = 0; i < items.length; i++) {
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
   lineitems.push({
     price_data: {
       currency: "dzd",
       product:items[i].product_ref,

        unit_amount: parseInt(price*100)  ,
     },
     quantity: items[i].qty,
   })
       }




       const pickup = await strapi
.service("api::pickup.pickup")
.findOne(state_id, {
  select: ["*"],

});





       if(payment_metod==1){




        const prentry = await strapi.entityService.create(
          "api::order.order",
          {
            data: {
            //  items: session,
              cart: items ,
              payment_type:"online",
              pickup:state_id,
              address:address,
              phone:phone,
              delivery_type:delivery_method==1?"delivery":"pickup",
              users_permissions_user:user.id ,
             // session_id:session.id,
              status: "initiated",
              publishedAt: Date.now(),
            },
          }
        )


        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items:lineitems,
          shipping_options: [
           {
             shipping_rate_data: {
               type: 'fixed_amount',
               fixed_amount: {
                 amount: delivery_method==1?pickup.home_price*100:pickup.pickup_price*100,
                 currency: 'dzd',
               },
               display_name: delivery_method==1?"توصيل إلى عنوان":"إستلام من نقطة توزيع",
               delivery_estimate: {
                 minimum: {
                   unit: 'business_day',
                   value: 5,
                 },
                 maximum: {
                   unit: 'business_day',
                   value: 7,
                 },
               },
             },
           },

         ],
          allow_promotion_codes: true,
         //  shipping_address_collection:{allowed_countries:["HK","SA","ET","DZ"]},
         //  phone_number_collection:{enabled:true,},
         customer_email:email&&email,
          expires_at: Math.floor(Date.now() / 1000) + (3600 * 24),
          success_url: `${process.env.CLIENT_URL}/payment?orderid=${prentry.id}`,
          cancel_url: `${process.env.CLIENT_URL}/user`
        });



        const entry = await strapi.entityService.update('api::order.order',prentry.id, {

          data: {
            items: session,
           // cart: items ,
            //users_permissions_user:user.id ,
            session_id:session.id,
            //status: "initiated",
            //publishedAt: Date.now(),
          },
          });

         entry;

         return ({ url: session.url })


       }else{


        const prentry = await strapi.entityService.create(
          "api::order.order",
          {
            data: {
            //  items: session,
              cart: items ,
              payment_type:"delivery",
              pickup:state_id,
              address:address,
              phone:phone,
              delivery_type:delivery_method==1?"delivery":"pickup",
              users_permissions_user:user.id ,
             // session_id:session.id,
              status: "initiated",
              publishedAt: Date.now(),
            },
          }
        )

        return({url:`${process.env.CLIENT_URL}/payment?orderid=${prentry.id}`})




       }








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

//     const resdev = await strapi.db
//     .query("api::order.order")
//     .findMany({
//       select: ["*"],

//       populate:["users_permissions_user"]
//     });

//     let ordarraydev = []
//  //
//     for (let i = 0; i < resdev.length; i++) {
//       let ordob = {}
//      const session = await stripe.checkout.sessions.retrieve(resdev[i].session_id);

//      if(session.status!="expired"&&session.payment_status=="paid"){
//       ordob.name =  resdev[i].users_permissions_user.username;
//     ordob.date = session.created;
//     ordob.phone = session.customer_details.phone
//     ordob.status = resdev[i].status;
//     ordob.id = resdev[i].id;
//     ordob.refId = session.id;
//     ordob.email =  resdev[i].users_permissions_user.email;
//     ordob.city = session.customer_details.address.city;
//     ordob.line1 = session.customer_details.address.line1;
//     ordob.line2 = session.customer_details.address.line2;
//      ordarraydev.push(ordob);
//    }

//     }

const resdev = await strapi.db
.query("api::order.order")
.findMany({
  select: ["*"],
  populate:["users_permissions_user","pickup"]
});
let ordarraydev = []
for (let i = 0; i < resdev.length; i++) {
 let ordob = {}
 if(resdev[i].payment_type=="online"){
  const session = await stripe.checkout.sessions.retrieve(resdev[i].session_id);
  if(session.status!="expired"&&session.payment_status=="paid"){
ordob.name =  resdev[i].users_permissions_user.username;
ordob.date = session.created;
ordob.phone = resdev[i].phone
ordob.status = resdev[i].status;
ordob.id = resdev[i].id;
ordob.refId = session.id;
 ordob.email = resdev[i].users_permissions_user.email;
ordob.payment_type = resdev[i].payment_type;
ordob.delivery_type = resdev[i].delivery_type;
ordob.total = session.amount_total;
ordob.url = session.url;
ordob.currency = session.currency;
ordob.payment_status = session.payment_status;
ordob.city = resdev[i].pickup.name_ar ;
ordob.line1 =  resdev[i].address;
ordob.line2 = "";
}
 }else{
let total_price=0;
let delivery_price=0;

if(resdev[i].delivery_type=="pickup"){
delivery_price = resdev[i].pickup.pickup_price;
}else{
delivery_price = resdev[i].pickup.home_price;
}
const date = new Date(resdev[i].createdAt);
const timestampInMilliseconds = date.getTime();
const unixTimestamp = timestampInMilliseconds / 1000;

 ordob.name =  resdev[i].users_permissions_user.username;
ordob.date = unixTimestamp;
ordob.phone = resdev[i].phone
ordob.payment_type = resdev[i].payment_type;
ordob.delivery_type = resdev[i].delivery_type;
ordob.status = resdev[i].status;
ordob.id = resdev[i].id;
ordob.refId = resdev[i].id;
ordob.email = resdev[i].users_permissions_user.email;

// ordob.total = session.amount_total;
ordob.url = "";
ordob.currency = "";
// ordob.payment_status = session.payment_status;
ordob.city = resdev[i].pickup.name_ar ;
ordob.line1 =  resdev[i].delivery_type=="pickup"?resdev[i].pickup.address_ar:resdev[i].address;
ordob.line2 = "";


 for (let j = 0; j < resdev[i].cart.length; j++) {
  let price = 0;
  let id = null;
    //Product approach
    const ressub = await strapi.db
    .query("api::varient.varient")
    .findOne({
      select: ["*"],
      where: {

          id: resdev[i].cart[j].id,

      },

    });
    console.dir(ressub);

    total_price = total_price + ressub.price * resdev[i].cart[j].qty;
        }

     ordob.total = total_price + delivery_price ;
     ordob.payment_status = "unpaid";

 }
 ordarraydev.push(ordob);



}


 return ordarraydev;
     break;


     case "getAdminOrders" :
     // validate list from orders with stripe checkout retrive1
     const resdeva = await strapi.db
     .query("api::order.order")
     .findMany({
       select: ["*"],
       populate:["users_permissions_user","pickup"]
     });
     let ordarraydeva = []
    for (let i = 0; i < resdeva.length; i++) {
      let ordob = {}
      if(resdeva[i].payment_type=="online"){
       const session = await stripe.checkout.sessions.retrieve(resdeva[i].session_id);
       if(session.status!="expired"){
    ordob.name =  resdeva[i].users_permissions_user.username;
     ordob.date = session.created;
     ordob.phone = resdeva[i].phone
     ordob.status = resdeva[i].status;
     ordob.id = resdeva[i].id;
     ordob.refId = session.id;
      ordob.email = resdeva[i].users_permissions_user.email;
    ordob.payment_type = resdeva[i].payment_type;
    ordob.delivery_type = resdeva[i].delivery_type;
     ordob.total = session.amount_total;
     ordob.url = session.url;
     ordob.currency = session.currency;
     ordob.payment_status = session.payment_status;
     ordob.city = resdeva[i].pickup.name_ar ;
     ordob.line1 =  resdeva[i].address;
     ordob.line2 = "";
     }
      }else{
 let total_price=0;
 let delivery_price=0;

 if(resdeva[i].delivery_type=="pickup"){
delivery_price = resdeva[i].pickup.pickup_price;
 }else{
  delivery_price = resdeva[i].pickup.home_price;
 }
 const date = new Date(resdeva[i].createdAt);
const timestampInMilliseconds = date.getTime();
const unixTimestamp = timestampInMilliseconds / 1000;

      ordob.name =  resdeva[i].users_permissions_user.username;
ordob.date = unixTimestamp;
ordob.phone = resdeva[i].phone
ordob.payment_type = resdeva[i].payment_type;
ordob.delivery_type = resdeva[i].delivery_type;
ordob.status = resdeva[i].status;
ordob.id = resdeva[i].id;
ordob.refId = resdeva[i].id;
  ordob.email = resdeva[i].users_permissions_user.email;

// ordob.total = session.amount_total;
ordob.url = "";
ordob.currency = "";
// ordob.payment_status = session.payment_status;
ordob.city = resdeva[i].pickup.name_ar ;
ordob.line1 =  resdeva[i].delivery_type=="pickup"?resdeva[i].pickup.address_ar:resdeva[i].address;
ordob.line2 = "";


      for (let j = 0; j < resdeva[i].cart.length; j++) {
       let price = 0;
       let id = null;
         //Product approach
         const ressub = await strapi.db
         .query("api::varient.varient")
         .findOne({
           select: ["*"],
           where: {

               id: resdeva[i].cart[j].id,

           },

         });
         console.dir(ressub);

         total_price = total_price + ressub.price * resdeva[i].cart[j].qty;
             }

          ordob.total = total_price + delivery_price ;
          ordob.payment_status = "unpaid";

      }
      ordarraydeva.push(ordob);



    }






  return ordarraydeva;
      break;


     case "getOrderItems" :


      if(utype==1||utype==5||utype==4){
        const {id} = ctx.request.body;

        // const lineItems = await stripe.checkout.sessions.listLineItems(
        //   id
        // );

        const lineItems = await strapi
            .service("api::order.order")
            .findOne(id, {
              select: ["*"],

            });

            let obitems = []

for (let i = 0; i < lineItems.cart.length; i++) {
//console.log(lineItems.cart[i].color)
let obitem = {};


obitem.code = lineItems.cart[i].code;
obitem.product_ref = lineItems.cart[i].product_ref;
obitem.img = lineItems.cart[i].img;
obitem.desc = lineItems.cart[i].desc;
obitem.id = lineItems.cart[i].id;
obitem.name = lineItems.cart[i].name;
obitem.qty = lineItems.cart[i].qty;


const color = await strapi
.service("api::color.color")
.findOne(lineItems.cart[i].color, {
  select: ["*"],

});

obitem.color = color

const varient = await strapi
.service("api::varient.varient")
.findOne(lineItems.cart[i].id, {
  select: ["*"],
  populate:["sizes"]
});


// console.log("sizeeeeeeeeeeevvvvvv",varient)

obitem.price = varient.price;



// const size = await strapi
// .service("api::size.size")
// .findOne(lineItems.cart[i].size, {
//   select: ["*"],

// });
obitem.size = varient.sizes[0].icon;





obitems.push(obitem)


}





   let returnArray = [];

//for (let i = 0; i < lineItems.data.length; i++) {
//   let ob = {};



//   ob.qty = lineItems.data[i].quantity;
//   const ressub = await strapi.db
//   .query("api::varient.varient")
//   .findMany({
//     select: ["*"],
//     where: {
//       // subcatagory: {
//       //   id: query.sid,
//       // },
//       product_ref:lineItems.data[i].price.product
//     },
//     populate: [
//       "color","size"
//     ],
//   });

// ob.colorEn = ressub[0].color.name_en;
// ob.colorAr = ressub[0].color.name_ar;
// ob.colorCode = ressub[0].color.colorCode;
// ob.product_ref= ressub[0].product_ref;
// ob.price = ressub[0].price;
// ob.sizeNameEn = ressub[0].size.name_en;
// ob.sizeNameAr = ressub[0].size.name_ar;
// ob.sizeIcom = ressub[0].size.icon;



//   const ressubp = await strapi.db
//   .query("api::product.product")
//   .findMany({
//     select: ["*"],
//     where: {
//       varients: ressub[0].id,


//     },
//     populate: [
//     ],
//   });

// ob.pid = ressubp[0].id;
// ob.nameEn = ressubp[0].name_en;
// ob.nameAr = ressubp[0].name_ar;
// ob.imgs = ressubp[0].img;


//   // console.dir(ressubp)
//   // console.dir(ressub)
//   // console.dir(lineItems);
// returnArray.push(ob);

//}


  return obitems
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

