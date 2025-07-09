import React from 'react'
import ProductCopm from './saveproduct'
import { FaCircleArrowRight } from 'react-icons/fa6'
import Product from './product'
function HorDiv(props) {
  return (
    <div className='  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-8   '>

{props.data&&props.data.map((product,index)=>(
product.status?  

<div className=" bg-white     "  key={index}>
    
<ProductCopm atcbtn={props.btn} data={product} /> 
</div>
:<></>
))}





{/* <div className='bg-red-300 p-3 rounded-md px-24 '>a</div>
<div className='bg-red-300 p-3 rounded-md px-24 '>a</div>
<div className='bg-red-300 p-3 rounded-md px-24 '>a</div> */}

    </div>
  )
}

export default HorDiv