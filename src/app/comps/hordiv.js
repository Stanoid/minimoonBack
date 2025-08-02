import React from 'react';
import ProductCopm from './saveproduct';

function HorDiv({ data, btn }) {
  return (
    <>
      {/* Mobile Layout */}
      <div
        dir="rtl"
        className="
          w-full
          p-3
          flex
          gap-4
          scrollbar-hide
          lg:hidden
          snap-x
          overflow-x-scroll
          snap-mandatory
        "
      >
        {data?.map(
          (product, index) =>
            product.status && (
              <div
                key={index}
                className="
                  flex-shrink-0
                  min-w-[14rem]  /* Ensures proper scrollable width */
                  snap-start
                "
              >
                <ProductCopm atcbtn={btn} data={product} />
              </div>
            )
        )}
      </div>

      {/* Desktop Layout */}
      <div
        dir="rtl"
        className="
          hidden
          lg:grid
          w-full
          gap-8
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          justify-items-center
        "
      >
        {data?.map(
          (product, index) =>
            product.status && (
              <div key={index} className="w-full min-w-0">
                <ProductCopm atcbtn={btn} data={product} />
              </div>
            )
        )}
      </div>
    </>
  );
}

export default HorDiv;
