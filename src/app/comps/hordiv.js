import React from 'react';
import ProductCopm from './saveproduct';

function HorDiv(props) {
  return (
    <div
      dir="rtl"
      className="
        scrollable-content
        w-lvw
        p-2
        flex
        overflow-x-scroll
        gap-4
lg:w-full lg:overflow-visible lg:flex-none
        lg:grid lg:grid-cols-4 lg:gap-8 lg:space-x-0 "
    >
      {props.data && props.data.map((product, index) =>
        product.status ? (
          <div
            key={index}
            className="
           lg:min-w-0  min-w-56
            "
          >
            <ProductCopm atcbtn={props.btn} data={product} />
          </div>
        ) : null
      )}
    </div>
  );
}

export default HorDiv;
