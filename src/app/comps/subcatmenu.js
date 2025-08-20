"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdClose } from "react-icons/md"; 

export default function Subcatmenu({ subCat = [] }) {
  const router = useRouter();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);

  const totalItems = subCat?.length || 0;

  const desktopInitialLimit = 8;
  const mobileItemLimit = 9;

  const half = Math.ceil(subCat.length / 2);
  const firstHalf = subCat.slice(0, half);
  const secondHalf = subCat.slice(half);

  const mobileItemsToShow = showAllMobile
    ? subCat
    : subCat.slice(0, mobileItemLimit);

  return (
    <div dir="rtl" className="w-full relative py-4">
      <div className="md:hidden z-50">
  <div className="flex justify-between h-full items-center mb-2 px-3">

  </div>

  {totalItems > 0 ? (
    <ul className="flex flex-col gap-4 max-h-[70vh]  text-gray-700 text-sm font-medium p-3">
      {subCat.map((item, index) => (
        <li
          key={index}
          className="w-full flex justify-between items-center px-4 py-3 transition-all duration-300"
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

<div className="hidden md:block">
  {totalItems > 0 ? (
    showAllDesktop ? (
      <div className="relative p-6 bg-white max-h-[60vh]   shadow-md">
        <button
          onClick={() => setShowAllDesktop(false)}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
          aria-label="إغلاق القائمة"
        >
          <MdClose size={24} />
        </button>
        <div className="grid grid-cols-3 p-8  gap-4 pt-6">

          <ul className="space-y-1">
            {firstHalf.map((item, index) => (
              <li key={index}>
                <a
                  onClick={() => {
                    const catId = item.catagory?.id;
                    if (catId) router.push(`/categories?cid=${catId}`);
                  }}
                  className="block p-1 text-right text-gray-700 text-sm hover:text-moon-200 transition-colors duration-200 cursor-pointer"
                >
                  {item.name_ar}
                </a>
              </li>
            ))}
          </ul>

          <ul className="space-y-1">
            {secondHalf.map((item, index) => (
              <li key={index}>
                <a
                  onClick={() => {
                    const catId = item.catagory?.id;
                    if (catId) router.push(`/categories?cid=${catId}`);
                  }}
                  className="block p-1 text-right text-gray-700 text-sm hover:text-moon-200 transition-colors duration-200 cursor-pointer"
                >
                  {item.name_ar}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-[350px]  p-2">

  <div className="relative md:col-span-2 rounded-lg overflow-hidden shadow-lg h-48 md:h-full">
    <Image
      src="/featured/IMG-20250802-WA0007.jpg"
      alt="Main offer"
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-2">
      <p className="text-white text-sm md:text-lg font-bold text-center drop-shadow-lg">
        اكتشف أفضل المنتجات اليوم!
      </p>
    </div>
  </div>

  <div className="flex flex-col gap-2 h-full">
    <div className="relative w-full h-24 md:h-1/2 rounded-lg overflow-hidden shadow-md">
      <Image
        src="/featured/IMG-20250802-WA0003.jpg"
        alt="Offer 1"
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="relative w-full h-24 md:h-1/2 rounded-lg overflow-hidden shadow-md">
      <Image
        src="/featured/IMG-20250802-WA0010.jpg"
        alt="Offer 2"
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
</div>

        </div>
      </div>
    ) : (
      <ul className="flex items-center justify-start gap-2 px-4 bg-white overflow-x-auto">
        {subCat.slice(0, desktopInitialLimit).map((item, index) => (
          <li key={index} className="flex items-center px-2 py-1">
            <a
              onClick={() => {
                const catId = item.catagory?.id;
                if (catId) router.push(`/categories?cid=${catId}`);
              }}
              className="flex-1 text-sm text-right text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
            >
              {item.name_ar}
            </a>
          </li>
        ))}
        {totalItems > desktopInitialLimit && (
          <li className="flex items-center">
            <button
              onClick={() => setShowAllDesktop(true)}
              className="text-gray-600 hover:text-moon-200  text-sm hover:underline z-10"
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
