import React from 'react';
import ProductCopm from './saveproduct';

function HorDiv({ data, btn }) {
  return (
    <>
      {/* Mobile Layout - Satisfying Horizontal Scroll */}
      <div
        className="
          w-full
          overflow-x-auto
          scrollbar-hide
          lg:hidden
          snap-x
          snap-mandatory
          scroll-smooth
        "
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch', // momentum scroll on iOS
        }}
      >
        <div
          dir="rtl"
          className="
            flex
            gap-4
            px-4
          "
        >
          {/* Spacer before first card for nicer feel */}
          <div className="flex-shrink-0 w-2" />

          {data?.map(
            (product, index) =>
              product.status && (
                <div
                  key={index}
                  className="
                    flex-shrink-0
                    min-w-[14rem]
                    snap-start
                    transition-transform
                    duration-300
                    ease-in-out
                  "
                >
                  <ProductCopm atcbtn={btn} data={product} />
                </div>
              )
          )}

          {/* Spacer after last card */}
          <div className="flex-shrink-0 w-2" />
        </div>
      </div>

      {/* Desktop Layout - Grid */}
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
