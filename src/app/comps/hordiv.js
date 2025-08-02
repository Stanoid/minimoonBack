import React from 'react';
import ProductCopm from './saveproduct';

function HorDiv(props) {
  return (
    <>
      {/* Mobile Layout (Visible only on small screens) */}
      <div
        dir="rtl"
        className="
          scrollable-content
          w-full
          p-2
          flex                 
          overflow-x-scroll
          gap-4                
          lg:hidden            
        "
      >
        {props.data && props.data.map((product, index) =>
          product.status ? (
            <div
              key={index}
              className="
                flex-shrink-0    /* Prevents items from shrinking, preserving min-w and gap */
                min-w-56         /* Minimum width for each product card on mobile */
              "
            >
              <ProductCopm atcbtn={props.btn} data={product} />
            </div>
          ) : null
        )}
      </div>

      {/* Desktop Layout (Visible only on large screens and up) */}
      <div
        dir="rtl"
        className="
          hidden
          lg:block             
          w-full               
          lg:grid              
          lg:grid-cols-1       
          md:grid-cols-2       
          lg:grid-cols-3       
          xl:grid-cols-4       
          lg:gap-8        
          justify-items-center 
          /* Important: Do NOT add lg:max-w-screen-xl or lg:mx-auto here if your parent div already handles that (which it likely does, from your <section> example). */
        "
      >
        {props.data && props.data.map((product, index) =>
          product.status ? (
            <div
              key={index}
              className="
                w-full
                min-w-0                 
              "
            >
              <ProductCopm atcbtn={props.btn} data={product} />
            </div>
          ) : null
        )}
      </div>
    </>
  );
}

export default HorDiv;