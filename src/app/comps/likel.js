import React from 'react'
import { motion } from 'framer-motion'
import Image from "next/image"
import {CURRENCY, IMG_URL} from '../local'
import { useRouter } from 'next/navigation'
import { BsX } from 'react-icons/bs'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../lib/actions/counterAction';

function LikeEl(props) {
// 
    const router = useRouter();

    return (

    <motion.div

    dir="rtl"
        //whileHover={{ scale: 1.03 }}
        //whileTap={{ scale: 0.9 }}
     //onClick={()=>{revalidatePath('/products?pid=${props.id}') ; props.closeModal()}}
      //  onClick={()=>{ router.refresh(); router.push(`/products?pid=${props.id}`);  props.closeModal()}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }} key={props.index} className='flex flex-row  
 rounded-sm p-2 items-center justify-between align-middle ' > 
  <a  href={`/products?pid=${props.id}`} >
    <div sty className='w-20 h-24 min-w-20  ' style={{position:"relative"}} >
    <Image
  src={`${props.img}`}
  alt={props.name}
  fill
  style={{ objectFit: "cover" }}
  quality={25}
  className="rounded-md"
  onClick={() => {
    router.push(`/products?pid=${props.id}`);
    props.closeModal();
  }}
/>

      
        
    
       
          </div>
        </a>

        <div className="flex flex-col text-gray-900 px-2 mx-2 py-1 text-sm rounded-full ">
          {props.code}

     
          <div className=' ' dir='rtl' >
               <div className='text-gray-900 text-lg'>
               {props.name.length>10?props.name.slice(0,40)+"...":props.name }
               </div>
               <div className='text-black font-bold' >
{props.price} {CURRENCY}
      </div>
                 </div>


        </div>
 {/* <div>
        <BsCartPlusFil />

 </div> */}

                 <div
      onClick={()=>{props.removeFav(props.lid)}}
      style={{display:props.order?"none":"flex",alignItems:"center",justifyContent:"center",borderRight:"0px solid lightgrey",paddingRight:10}}>
         <div
          className="border border-moon-200 rounded-md  text-moon-200"
            style={{  padding: 2.5 }}
          >
            <BsX style={{ color: "", fontSize: 25 }} />
          </div>
  
      </div>
                
                </motion.div>
                
  )
}

export default LikeEl