'use client';

import React from 'react';
import {useEffect,useState,useRef,useContext } from 'react';
import { API_URL, CURRENCY, IMG_URL} from '../local';
import { Button } from '@nextui-org/react';
import { FaCheckCircle,FaExchangeAlt,FaListAlt,FaShoppingBasket } from 'react-icons/fa';
import { clearCart } from '../lib/actions/counterAction';
import { useRouter } from 'next/navigation'
import { CartCon } from '../contexts/cartContext';
import { BiFontSize } from 'react-icons/bi';
import InputEl from '../comps/inputel';
import TableComp from '../comps/sandbox/table';
import LoadingBtn from '../comps/loadingbtn';
import Image from 'next/image';
import { useSelector,useDispatch } from 'react-redux';
import { color, motion } from 'framer-motion';
import Cartel from '../comps/cartel';
import { FaCreditCard, FaHandHoldingDollar, FaMapLocation, FaMapPin } from 'react-icons/fa6';
import { FaArrowAltCircleRight } from 'react-icons/fa';

function AccounteEl() {
    const ls = require("local-storage")
  const [lod,setLod] =useState(false)
  const [refr,setRefr] = useState(true);
  const firstRenderRef = useRef(true);
    const router = useRouter(); 

    const dispatch = useDispatch();
    const cartg = useSelector((state) => state.root.cart.data)
    console.log("cart  swtuff", cartg)
    const [page,setPage] = useState(1) 
    const [address,setAddress] = useState(""); 
    const [phone,setPhone] = useState(""); 
    const [phoneC,setPhoneC] = useState(""); 
    const [email,setEmail] = useState(null); 
    const [pickups,setpickups] = useState(null);
    const [selpick,setselpick] = useState(null);
    const [deliveryPrice,setDeleveryPrice] = useState(0);
    const [checkOutArray,setCheckoutArray]=useState([])
    const [paymentMeth,setPaymentMeth] = useState(2);
    const [deliveryMeth,setsetDeliveryMeth] = useState(1);
    const [total,setTotal] = useState(0)
    const [gtotal,setgTotal] = useState(0)
    const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    const {useNotifi} = useContext(CartCon);

    useEffect(() => {
if(isLogged){
  console.log(isLogged.data.user.username)
  setEmail(isLogged.data.user.username);
}
      getPicks();

   //  console.log(isLogged)

 let checkArray = [];
let total = 0;
let colorName = "";
     let colorValue= "";
let price = 0;
let size= "";
      for (let i = 0; i < cartg.length; i++) {
    for (let j = 0; j < cartg[i].data.attributes.varients.data.length; j++) {
    if(cartg[i].data.attributes.varients.data[j].id==cartg[i].selvar){ 
  total = total +  cartg[i].data.attributes.varients.data[j].attributes.price * cartg[i].qty;
     
  // for (let x = 0; x < cartg[i].data.attributes.varients.data[j].attributes.colors.data.length; x++) {
  //   if(cartg[i].data.attributes.varients.data[j].attributes.colors.data[x].id==cartg[i].color){
  //    colorName= cartg[i].data.attributes.varients.data[j].attributes.colors.data[x].attributes.name_ar;
  //    colorValue= cartg[i].data.attributes.varients.data[j].attributes.colors.data[x].attributes.colorCode;
  //   }
     
  //   }
    colorName= cartg[i].data.attributes.varients.data[j].attributes.colors.data[0].attributes.name_ar
    colorValue= cartg[i].data.attributes.varients.data[j].attributes.colors.data[0].attributes.colorCode

    price = cartg[i].data.attributes.varients.data[j].attributes.price;
    size = cartg[i].data.attributes.varients.data[j].attributes.sizes.data[0].attributes.name_ar +" - " + cartg[i].data.attributes.varients.data[j].attributes.sizes.data[0].attributes.icon;

    }


    }



    checkArray.push(
      {id:cartg[i].selvar,
        price:price ,
        sizeo:size,
        qty: cartg[i].qty,
        code: cartg[i].code,
        colorname:colorName,
        color:colorValue,
        imgsingle:cartg[i].img,
      }
    )
      





      }
setCheckoutArray(checkArray);   
console.log("checkkkkkkk",checkArray)   
setTotal(total)
setgTotal(total+deliveryPrice)


    }, [cartg,deliveryPrice,refr])
  
     const handleDelChangle = (stat)=>{
setsetDeliveryMeth(stat);
handleCityChange(selpick,stat);
     }

    const handleCityChange= (val,stat)=>{

      setselpick(val)
      console.log(val,deliveryMeth)
let price =0;
      for (let i = 0; i < pickups.length; i++) {
   if(pickups[i].id==val){
    if(stat){
      if(stat==1){
        console.log("add")
      price = pickups[i].home_price;
      }else if(stat==2){
        console.log("pik")
        price = pickups[i].pickup_price;
      }
    }else{
      if(deliveryMeth==1){
        console.log("add")
      price = pickups[i].home_price;
      }else if(deliveryMeth==2){
        console.log("pik")
        price = pickups[i].pickup_price;
      }
    }


setDeleveryPrice(price);
setRefr(!refr);


   }
        
      }


    }


    const getPicks=()=>{
         
      //props.setLod(true);
               
          const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                
            },
          
        };
    
          fetch(`${API_URL}products?func=getPick`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
             console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data)
              setpickups(data);
             console.log("zzzzzzzzzzzzzzzzzzzzzzz",data.data)
  
          //  return data
            }).then((arr)=>{
          
            })
      
      
          }




          //validate phone 
          const isPhoneValid = (phoneNumber) => {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phoneNumber);
        }
        //validate adtress 
        const isAdressValid = (adress) => {
          const adressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
          return addressRegex.test(adress);}


      //validate email 
    //   const isEmailValid = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }

    const handleOrder= ()=>{

      //email and selpic validation
      //payment method backend implmentation
      if(selpick==null){
        useNotifi("error","الر جاء  إختيار الولاية")
        return;
      }

      // if (!email || !isEmailValid(email)) {
      //       useNotifi("error", "الرجاء إدخال بريد إلكتروني صالح");
      //       return;
      //   }
      
        if (!phone || !isPhoneValid(phone)) {
          useNotifi("error", "  يجب أن يتكون رقم الهاتف من 10 أرقام   ");
          return;
      }

      if (phone !== phoneC) {
        useNotifi("error", "رقم الهاتف غير متطابق");
        return;
    }
    if (address.length < 3) {
      useNotifi("error", "الرجاء إدخال عنوان صالح");
      return;
    }

      
     

      if(cartg.length==0){
        useNotifi("error","الرجاء إضافة منتجات")
        return
      }
    
      setLod(true)
      let payarray = []
      for (let i = 0; i < cartg.length; i++) {
        payarray.push({
          id: cartg[i].selvar,
          product_ref:cartg[i].product_ref,
          name:cartg[i].name,
          img:cartg[i].images?.[0].data.url,
          code:cartg[i].code,
          qty: cartg[i].qty,
          desc: cartg[i].data.attributes.description_en 
        
        })
      }
    
    
     // console.log();
      
     if(isLogged){
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' +  isLogged.data.jwt
        },
        body: JSON.stringify({
           items: payarray,
           payment_metod: paymentMeth,
           delivery_method:deliveryMeth,
           state_id:selpick,
           phone:phone,
           address:address,
           email:email,
          })
      };

      fetch(`${API_URL}orders?func=initPaymentSession`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setLod(false)
    window.location= data.url;
      }).then(()=>{
        
      });
     }else{
      const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            

        },
        body: JSON.stringify({
           items: payarray,
           payment_metod: paymentMeth,
           delivery_method:deliveryMeth,
           state_id:selpick,
           phone:phone,
           address:address,
           email:email,
          })
      };

      fetch(`${API_URL}orders?func=initPaymentSessionGuest`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("shshshshshshshsgaaahahajsjskski",data)
        setLod(false)
   window.location= data.url;
      }).then(()=>{
        
      });
     }
      

    
   
                            
    
    }


  return (
  
<div className='flex-col md:flex-row lg:grid grid-cols-3 lg:pt-12 lg:mb-32 w-full '   >

<div className='flex flex-1 flex-col lg:mt-[30px] px-3 w-full  '>


{/* <TableComp
   data={checkOutArray}
   checkout={true}
   columns={
    [
      {name: "ID", uid: "selvar", sortable: true},
      {name: "رمز المنتج", uid: "code", sortable: true},
      {name: "السعر", uid: "price", sortable: true},
      {name: "الكمية", uid: "qty", sortable: true},
      {name: " إسم اللون", uid: "colorname",sortable: true },
      {name: "اللون", uid: "color", sortable: true},
      {name: " المقاس", uid: "sizeo",sortable: true },
     {name: "الصورة", uid: "imgsingle", sortable: true},  
     
    ]
   }
   
   delorder={()=>{}}
    /> */}
<div id="scrol" className='flex flex-1 flex-col lg:px-3 w-full'>
    <div className="bg-white p-4 rounded-md shadow mb-4">
        <div className="flex justify-end items-center py-4 border-b border-gray-300 mb-4">
            <h2 className="text-lg font-bold text-gray-800">المنتجات</h2>
        </div>

        {cartg && cartg.length !== 0 ? (
            <>
                {cartg.map((cart, index) => {
                    const selectedVariant = cart.data.attributes.varients.data.find(v => v.id === cart.selvar);

                    const productPrice = selectedVariant?.attributes.price || 0;
                    const productName = cart.name || `Product ${cart.code}`;
                    // const productImage = cart.data.attributes.images?.data?.[0]?.attributes?.url
                    // const productImage = `${API_URL.replace(/\/$/, "")}${cart.data.attributes.images?.data?.[0]?.attributes?.url || ""}`;
                    const productImage = cart.data.attributes.images?.data?.[0]?.attributes?.url;
const fullProductImage = `${IMG_URL}${productImage}`;
console.log(`checkoutimagim ${IMG_URL} ${productImage}`)

                    const productSize = selectedVariant?.attributes.sizes.data[0]?.attributes.name_ar + " - " + selectedVariant?.attributes.sizes.data[0]?.attributes.icon || "";
                    const productColorName = selectedVariant?.attributes.colors.data[0]?.attributes.name_ar || "";
                    const productColorHex = selectedVariant?.attributes.colors.data[0]?.attributes.colorCode || "#000000";

                    return (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center">
                                <span className="text-sm font-bold text-gray-800 ml-2">{productPrice.toLocaleString()} د.ج</span>
                                <span className="text-gray-600">x {cart.qty}</span>
                            </div>

                            <div className="flex flex-col items-end text-right flex-grow mx-2">
                                <span className="text-sm font-semibold text-gray-800">{productName}</span>
                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                    <span className="mr-1">المقاس: {productSize}</span>
                                    <span
                                        className="w-3 h-3 rounded-full mr-1"
                                        style={{ backgroundColor: productColorHex }}
                                    ></span>
                                    <span>اللون: {productColorName}</span>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Image
                                    src={fullProductImage}
                                    alt={productName}
                                    width={60}
                                    height={60}
                                    className="rounded-md object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </>
        ) : (
            null 
        )}
    </div>

    <div className="bg-white p-4 rounded-md shadow mt-4">
        <h2 className="text-lg font-bold text-gray-800 text-right mb-4">إجمالي الطلب</h2>
        <div className="flex justify-between items-center text-gray-700 mb-2">
            <span className="font-semibold"> {total.toLocaleString()} د.ج </span>
            <span>الإجمالي الأساسي</span>
        </div>
        <div className="flex justify-between items-center text-green-600 mb-2">
            <span className="font-semibold">- 0 د.ج</span>
            <span>تم توفير</span>
        </div>
        <div className="flex justify-between items-center text-gray-700 mb-2">
            <span className="font-semibold"> {deliveryPrice.toLocaleString()} د.ج </span>
            <span>مصاريف الشحن و التوصيل</span>
        </div>
        <div className="flex justify-between items-center text-gray-800 font-bold text-lg mt-4 pt-4 border-t border-gray-300">
            <span> {gtotal.toLocaleString()} د.ج </span>
            <span>الإجمالي</span>
        </div>
    </div>
</div>




{/* <div className='p-6'>
<div className='flex  flex-row-reverse    w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :المجموع </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {total}  {CURRENCY} </div>
    </div> 

<div className='flex   flex-row-reverse  w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :التوصيل </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {selpick==null? <span>إختر الولاية</span> :<span>{deliveryPrice}  {CURRENCY}</span> }  </div>
    </div> 

    <div className='flex flex-row-reverse  w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :المجموع الكلي </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {gtotal}  {CURRENCY} </div>
    </div> 
</div> */}
      

</div>











                        
    <div className='flex  flex-col space-y-4 w-full px-3 col-span-2 mt-8' >

   



     <div className='flex flex-col bg-white p-3 border border-gray-200 rounded-md w-full'>
    <div className='text-gray-900 font-bold text-right text-xl mb-2 ' >  الدفع</div>

 <div className='flex flex-col sm:flex-row lg:flex-row items-center space-y-4 lg:space-x-2 md:space-x-2 lg:space-y-0 md:space-y-0   justify-between'>


 <div onClick={()=>{
//  setPaymentMeth(1)
}}
  className={`${paymentMeth==1?" border-moon-200 bg ":" shadow-gray-400 "}  flex hover:shadow-md 
   transition-shadow cursor-pointer opacity-20  w-full bg-gray-200  flex-1 border-2 p-4 rounded-md items-center justify-between`}
 >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
    <FaCreditCard/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-gray font-semibold text-base'>
        دفع إلكتروني
      </div>
      <div className='text-xs'>
         الدفع بإستخدام بطاقة بنكية
      </div>
    </div>
      
    </div> 




    <div onClick={()=>{setPaymentMeth(2)}}
    //  className='flex  flex-1 border-2 p-4 rounded-md border-moon-200 items-center justify-between'
    className={`${paymentMeth==2?"shadow-lg border-moon-200 bg-moon-100 ":" shadow-gray-800 "}  flex w-full hover:shadow-md transition-shadow cursor-pointer flex-1 border p-4 rounded-md items-center justify-between`}
    
    >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
    <FaHandHoldingDollar/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-gray-900 font-semibold text-base'>
        دفع عند الإستلام
      </div>
      <div className='text-xs'>
      يتم اضافة   {deliveryPrice}     </div>
    </div>
      
    </div> 
  </div> 


    </div>    



    



    <div className='flex flex-col    w-full'>
    <div className='bg-white p-3 rounded-md border border-gray-200'>

    <div className='text-gray-800 font-bold text-right text-xl mb-2 ' > التوصيل </div>

 <div className='flex flex-col sm:flex-row lg:flex-row items-center space-y-4 lg:space-x-2 md:space-x-2 lg:space-y-0 md:space-y-0   justify-between'>


 <div onClick={()=>{handleDelChangle(1);}}
  className={`${deliveryMeth==1?"shadow-lg border-moon-200 bg-moon-100 ":" shadow-gray-800 "}  flex hover:shadow-md w-full transition-shadow cursor-pointer   flex-1 border p-4 rounded-md items-center justify-between`}
 >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
    <FaMapPin/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-gray-9000 font-semibold text-base'>
         توصيل لعنوان
      </div>
      <div className='text-xs'>
        التوصيل إلى عنوان معين 
      </div>
    </div>
      
    </div> 




    <div onClick={()=>{handleDelChangle(2);}}
    //  className='flex  flex-1 border-2 p-4 rounded-md border-moon-200 items-center justify-between'
    className={`${deliveryMeth==2?"shadow-lg border-moon-200 bg-moon-100 ":" shadow-gray-800 "}  flex w-full hover:shadow-md transition-shadow cursor-pointer flex-1 border p-4 rounded-md items-center justify-between`}
    
    >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
    <FaMapLocation/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-gray-900 font-semibold text-base'>
            نقطة توزيع
      </div>
      <div className='text-xs'>
                 من نقطة التوزيع  
      </div>
    </div>
      
    </div> 
  </div> 


    
  </div>

  <div className='mt-4 bg-white border border-gray-200  p-3'>

  {/* <InputEl
            value={selpick}
            outputfunc={(val) => {
             handleCityChange(val);           
            }}
            iden={"color"}
            data={pickups}
            iscats={true}
            select={true}
            label={"الولاية"}
          /> */}

<div className='mt-4 bg-white p-3 rounded-md'> 
    <InputEl
        value={selpick}
        outputfunc={(val) => {
            handleCityChange(val);
        }}
        iden={"color"}
        data={pickups}
        iscats={true}
        select={true}
        label={"الولاية"}
    />

    {/* Responsive Grid for Inputs */}
    <div className='mt-4 flex flex-col md:grid md:gap-10'
        style={{
            // Default (mobile): flex column
            // md: (desktop/tablet): grid layout
            gridTemplateAreas: `
                'email email email email'
                'adress adress adress adress'
                'phone phone phone_c phone_c'
            `
        }}
    >
        <div style={{ gridArea: "email" }}>
            <InputEl className="bg-white" value={isLogged ? isLogged.data.user.username : email} disabled={isLogged}
                outputfunc={(val) => { setEmail(val) }} label={"الإسم"} />
        </div>

        <div style={{ gridArea: "phone" }}>
            <InputEl outputfunc={(val) => { setPhone(val) }} label={"رقم الهاتف"} />
        </div>

        <div style={{ gridArea: "phone_c" }}>
            <InputEl outputfunc={(val) => { setPhoneC(val) }} label={"تأكيد رقم الهاتف"} />
        </div>

        <div style={{ gridArea: "adress", display: deliveryMeth == 1 ? "block" : "none" }}>
            <InputEl outputfunc={(val) => { setAddress(val) }} label={"العنوان"} />
        </div>
    </div>
</div>
{/* 
   <div style={{
    width:"100%",
display: deliveryMeth==2?"grid":"none",
gap:10,
gridTemplateAreas:`
' city  city  . .   ' 
' phone phone . .    ' 


`
   }} >
    
    <div style={{gridArea:"phone"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إختر نقطة الإستلام"}/>
    </div>  

   


   
   </div> */}

  </div>


  <div className='text-sm'>
    
  <LoadingBtn  className="text-sm"   act={()=>{
                       handleOrder() ; 
                       }}  text={"تاكيد الطلب   "} lod={lod} />

  </div>


    </div>   



    </div>





</div>


  )
}

export default AccounteEl






















































