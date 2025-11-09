"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useI18n } from "../lib/i18n";

export default function Subcatmenu({ subCat = [] }) {
  const router = useRouter();
  const { t, direction } = useI18n();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);

  // Null-safe subCat handling
  const safeSubCat = Array.isArray(subCat) ? subCat : [];
  const totalItems = safeSubCat.length;

  const desktopInitialLimit = 8;
  const mobileItemLimit = 9;

  // Null-safe calculations
  const half = Math.ceil(safeSubCat.length / 2);
  const firstHalf = safeSubCat.slice(0, half);
  const secondHalf = safeSubCat.slice(half);

  const mobileItemsToShow = showAllMobile
    ? safeSubCat
    : safeSubCat.slice(0, mobileItemLimit);

  const handleCategoryClick = (item) => {
    try {
      if (!item) {
        console.warn('Category item is null or undefined');
        return;
      }

      const catId = item?.catagory?.id;
      if (catId) {
        router.push(`/categories?cid=${catId}`);
      } else {
        console.warn("Category ID not found", item);
      }
    } catch (err) {
      console.error('Error navigating to category:', err, item);
    }
  };

  const getCategoryName = (item) => {
    try {
      if (!item) return '';
      return item.name_ar || item.name || '';
    } catch (err) {
      console.error('Error getting category name:', err, item);
      return '';
    }
  };

  return (
    <div dir={direction} className="w-full relative py-4">
      <div className="md:hidden z-50">
  <div className="flex justify-between h-full items-center mb-2 px-3">

  </div>

  {totalItems > 0 ? (
    <ul className="flex flex-col gap-4 max-h-[70vh] text-gray-700 text-sm font-medium p-3">
      {safeSubCat.map((item, index) => {
        try {
          if (!item) {
            console.warn(`Item at index ${index} is null or undefined`);
            return null;
          }

          const categoryName = getCategoryName(item);
          if (!categoryName) {
            console.warn(`Category name not found for item at index ${index}`, item);
            return null;
          }

          return (
            <li
              key={item.id || index}
              className="w-full flex justify-between items-center px-4 py-3 transition-all duration-300"
            >
              <button
                onClick={() => handleCategoryClick(item)}
                className={`flex-1 text-gray-900 font-semibold ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
              >
                {categoryName}
              </button>
            </li>
          );
        } catch (err) {
          console.error(`Error rendering category item at index ${index}:`, err, item);
          return null;
        }
      })}
    </ul>
  ) : (
    <p className="text-gray-500 text-sm px-3 py-2">{t('noCategories')}</p>
  )}
</div>

<div className="hidden md:block">
  {totalItems > 0 ? (
    showAllDesktop ? (
      <div className="relative p-6 bg-white max-h-[60vh]   shadow-md">
        <button
          onClick={() => {
            try {
              setShowAllDesktop(false);
            } catch (err) {
              console.error('Error closing desktop menu:', err);
            }
          }}
          className={`absolute top-2 text-gray-600 hover:text-gray-900 ${direction === 'rtl' ? 'left-2' : 'right-2'}`}
          aria-label={t('closeMenu')}
        >
          <MdClose size={24} />
        </button>
        <div className="grid grid-cols-3 p-8  gap-4 pt-6">

          <ul className="space-y-1">
            {firstHalf.map((item, index) => {
              try {
                if (!item) {
                  console.warn(`First half item at index ${index} is null`);
                  return null;
                }
                const categoryName = getCategoryName(item);
                return (
                  <li key={item.id || index}>
                    <a
                      onClick={() => handleCategoryClick(item)}
                      className={`block p-1 text-gray-700 text-sm hover:text-moon-200 transition-colors duration-200 cursor-pointer ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {categoryName}
                    </a>
                  </li>
                );
              } catch (err) {
                console.error(`Error rendering first half item at index ${index}:`, err, item);
                return null;
              }
            })}
          </ul>

          <ul className="space-y-1">
            {secondHalf.map((item, index) => {
              try {
                if (!item) {
                  console.warn(`Second half item at index ${index} is null`);
                  return null;
                }
                const categoryName = getCategoryName(item);
                return (
                  <li key={item.id || index}>
                    <a
                      onClick={() => handleCategoryClick(item)}
                      className={`block p-1 text-gray-700 text-sm hover:text-moon-200 transition-colors duration-200 cursor-pointer ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      {categoryName}
                    </a>
                  </li>
                );
              } catch (err) {
                console.error(`Error rendering second half item at index ${index}:`, err, item);
                return null;
              }
            })}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-[350px]  p-2">

  <div className="relative md:col-span-2 rounded-lg overflow-hidden shadow-lg h-48 md:h-full">
    <Image
      src="/featured/IMG-20250802-WA0007.jpg"
      alt="Main offer"
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 hover:scale-105"
      onError={(e) => {
        console.error('Error loading main offer image:', e);
      }}
    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-2">
      <p className="text-white text-sm md:text-lg font-bold text-center drop-shadow-lg">
        {t('discoverProducts')}
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
        onError={(e) => {
          console.error('Error loading offer 1 image:', e);
        }}
      />
    </div>
    <div className="relative w-full h-24 md:h-1/2 rounded-lg overflow-hidden shadow-md">
      <Image
        src="/featured/IMG-20250802-WA0010.jpg"
        alt="Offer 2"
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          console.error('Error loading offer 2 image:', e);
        }}
      />
    </div>
  </div>
</div>

        </div>
      </div>
    ) : (
      <ul className="flex items-center justify-start gap-2 px-4 bg-white overflow-x-auto">
        {safeSubCat.slice(0, desktopInitialLimit).map((item, index) => {
          try {
            if (!item) {
              console.warn(`Desktop item at index ${index} is null`);
              return null;
            }
            const categoryName = getCategoryName(item);
            return (
              <li key={item.id || index} className="flex items-center px-2 py-1">
                <a
                  onClick={() => handleCategoryClick(item)}
                  className={`flex-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  {categoryName}
                </a>
              </li>
            );
          } catch (err) {
            console.error(`Error rendering desktop item at index ${index}:`, err, item);
            return null;
          }
        })}
        {totalItems > desktopInitialLimit && (
          <li className="flex items-center">
            <button
              onClick={() => {
                try {
                  setShowAllDesktop(true);
                } catch (err) {
                  console.error('Error opening desktop menu:', err);
                }
              }}
              className="text-gray-600 hover:text-moon-200 text-sm hover:underline z-10"
              aria-label={`${t('seeMore')} (${totalItems})`}
            >
              {t('seeMore')}
            </button>
          </li>
        )}
      </ul>
    )
  ) : (
    <p className="text-gray-500 text-sm px-6 py-2">{t('noCategories')}</p>
  )}
</div>

    </div>
  );
}
