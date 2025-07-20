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
          w-full               /* Use w-full for consistent mobile width, not w-lvw */
          p-2
          flex                 /* Flex container for horizontal scrolling */
          overflow-x-scroll
          gap-4                /* Creates gap between flex items */
          lg:hidden            /* Hides this div on large screens and up */
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
          hidden               /* Hidden by default on mobile */
          lg:block             /* Displays as a block on large screens and up */
          w-full               /* Takes full width of its parent container */
          lg:grid              /* Enables CSS Grid for desktop layout */
          lg:grid-cols-1       /* Base grid: 1 column on large screens */
          md:grid-cols-2       /* 2 columns on medium screens (adjust as needed) */
          lg:grid-cols-3       /* 3 columns on large screens (adjust as needed for 1280px container) */
          xl:grid-cols-4       /* 4 columns on extra-large screens */
          lg:gap-8             /* Creates gap between grid items on desktop */
          justify-items-center /* Centers each product card horizontally within its grid cell */
          /* Important: Do NOT add lg:max-w-screen-xl or lg:mx-auto here if your parent div already handles that (which it likely does, from your <section> example). */
        "
      >
        {props.data && props.data.map((product, index) =>
          product.status ? (
            <div
              key={index}
              className="
                w-full                  /* Ensures product component takes full width of its grid cell */
                min-w-0                 /* Allows item to shrink correctly within grid cell */
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