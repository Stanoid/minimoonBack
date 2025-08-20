"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdClose } from "react-icons/md"; // Import the close icon

export default function Subcatmenu({ subCat = [] }) {
  const router = useRouter();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);

  const totalItems = subCat?.length || 0;
  // Limit the initial desktop view to a single row of items.
  const desktopInitialLimit = 8;
  const mobileItemLimit = 9;

  // Split the subcategories for the two-column layout in the mega menu
  const half = Math.ceil(subCat.length / 2);
  const firstHalf = subCat.slice(0, half);
  const secondHalf = subCat.slice(half);

  // Determine which items to show for mobile view
  const mobileItemsToShow = showAllMobile
    ? subCat
    : subCat.slice(0, mobileItemLimit);

  return (
    <div dir="rtl" className="w-full relative py-4">
      {/* --- Mobile View (hidden on medium screens and up) --- */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-2 px-3">
          <p className="text-xl font-bold">التصنيفات</p>
          {totalItems > mobileItemLimit && (
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="text-blue-600 font-medium text-sm hover:underline"
              aria-label={showAllMobile ? "عرض أقل" : `عرض الكل (${totalItems})`}
            >
              {showAllMobile ? "عرض أقل" : `عرض الكل (${totalItems})`}
            </button>
          )}
        </div>
        {totalItems > 0 ? (
          <ul className="flex flex-wrap gap-4 max-w-full text-gray-700 text-sm font-medium p-3">
            {mobileItemsToShow.map((item, index) => (
              <li
                key={index}
                className="w-full sm:w-[48%] flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300"
              >
                <button
                  onClick={() => {
                    const catId = item.catagory?.id;
                    if (catId) router.push(`/categories?cid=${catId}`);
                    else console.warn("Category ID not found", item);
                  }}
                  className="flex-1 text-right text-gray-900 font-semibold"
                >
                  {item.name_ar}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm px-3 py-2">لا توجد تصنيفات متاحة</p>
        )}
      </div>

      {/* --- Desktop View (visible on medium screens and up) --- */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center mb-4 border-b pb-2 px-6">
          <p className="text-xl font-bold">التصنيفات</p>
        </div>
        {totalItems > 0 ? (
          showAllDesktop ? (
            <div className="relative p-6 bg-gray-50 rounded-lg shadow-md">
              <button
                onClick={() => setShowAllDesktop(false)}
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
                aria-label="إغلاق القائمة"
              >
                <MdClose size={24} />
              </button>
              <div className="grid grid-cols-3 gap-8 pt-8">
                {/* First column for subcategories */}
                <ul className="space-y-2">
                  {firstHalf.map((item, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          const catId = item.catagory?.id;
                          if (catId) router.push(`/categories?cid=${catId}`);
                          else console.warn("Category ID not found", item);
                        }}
                        className="block p-2 text-right text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        {item.name_ar}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Second column for subcategories */}
                <ul className="space-y-2">
                  {secondHalf.map((item, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          const catId = item.catagory?.id;
                          if (catId) router.push(`/categories?cid=${catId}`);
                          else console.warn("Category ID not found", item);
                        }}
                        className="block p-2 text-right text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        {item.name_ar}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Third column for a promotional image */}
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="https://placehold.co/600x400/D1E7DD/000?text=عروض+خاصة"
                    alt="Special offers banner"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <p className="text-white text-lg font-bold text-center drop-shadow-lg">
                      اكتشف أفضل المنتجات اليوم!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ul className="flex items-center justify-end gap-4 p-6 bg-gray-50 rounded-lg shadow-md">
              {subCat.slice(0, desktopInitialLimit).map((item, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300"
                >
                  <a
                    onClick={() => {
                      const catId = item.catagory?.id;
                      if (catId) router.push(`/categories?cid=${catId}`);
                      else console.warn("Category ID not found", item);
                    }}
                    className="flex-1 text-right text-gray-900 font-semibold text-md hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    {item.name_ar}
                  </a>
                </li>
              ))}
              {totalItems > desktopInitialLimit && (
                <li className="flex items-center">
                  <button
                    onClick={() => setShowAllDesktop(true)}
                    className="text-blue-600 font-medium text-sm hover:underline z-10"
                    aria-label={`شاهد المزيد (${totalItems})`}
                  >
                    شاهد المزيد
                  </button>
                </li>
              )}
            </ul>
          )
        ) : (
          <p className="text-gray-500 text-sm px-6 py-2">لا توجد تصنيفات متاحة</p>
        )}
      </div>
    </div>
  );
}
