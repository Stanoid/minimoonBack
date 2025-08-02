import React from 'react'
import ProductCopm from './saveproduct'

function HorDiv(props) {
  return (
    <>
      {/* Mobile Layout - improved gap */}
      <div
        dir='rtl'
        className='scrollable-content w-lvw flex items-center p-2 px-4 gap-4 overflow-x-scroll lg:hidden'
      >
        {props.data && props.data.map((product, index) => (
          product.status ? (
            <div
              key={index}
              className="flex justify-center items-center min-w-56 rounded-md shadow-md shadow-gray-300"
            >
              <ProductCopm atcbtn={props.btn} data={product} /> 
            </div>
          ) : null
        ))}
      </div>

      {/* Desktop Layout - centered and clean */}
      <div
        dir="rtl"
        className="
          hidden
          lg:grid
          w-full
          max-w-[1280px]
          mx-auto
          gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          px-4
        "
      >
        {props.data && props.data.map((product, index) => (
          product.status ? (
            <div
              key={index}
              className="rounded-md shadow-md shadow-gray-300 flex justify-center items-center"
            >
              <ProductCopm atcbtn={props.btn} data={product} /> 
            </div>
          ) : null
        ))}
      </div>
    </>
  )
}

export default HorDiv
