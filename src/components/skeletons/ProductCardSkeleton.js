'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

/**
 * Product Card Skeleton - Matches the actual product card layout
 * Desktop: 308px x 501px
 * Mobile: full width x 330px
 */
const ProductCardSkeleton = ({ count = 1, className = "" }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`
            lg:w-[308px] lg:h-[501px]
            w-full h-[330px]
            rounded-lg
            border border-gray-200
            bg-white
            shadow-md
            flex flex-col
            overflow-hidden
            relative
            ${className}
          `}
        >
          {/* Image Skeleton */}
          <div className="relative h-full lg:max-w-[308px] lg:max-h-[308px] w-full">
            <Skeleton 
              width="100%" 
              height="100%" 
              rounded="t-lg"
              className="absolute inset-0"
            />
            {/* Favorite icon placeholder */}
            <Skeleton width="40px" height="40px" rounded="md" className="absolute top-2 left-2" />
          </div>

          {/* Content Skeleton */}
          <div className="flex flex-col p-2 lg:max-h-[193px] h-full lg:max-w-[308px] w-full bg-white items-end">
            {/* Title Skeleton */}
            <div className="w-full mb-2 hidden lg:block">
              <Skeleton width="90%" height="20px" rounded="md" className="ml-auto" />
              <Skeleton width="60%" height="16px" rounded="md" className="ml-auto mt-2" />
            </div>
            
            {/* Mobile Title */}
            <div className="w-full mb-2 lg:hidden">
              <Skeleton width="70%" height="18px" rounded="md" className="ml-auto" />
              <Skeleton width="50%" height="16px" rounded="md" className="ml-auto mt-2" />
            </div>

            {/* Color dots skeleton */}
            <div className="flex items-center mb-2">
              <Skeleton width="16px" height="16px" rounded="full" className="ml-1" />
              <Skeleton width="16px" height="16px" rounded="full" className="ml-1" />
              <Skeleton width="16px" height="16px" rounded="full" className="ml-1" />
            </div>

            {/* Rating skeleton */}
            <div className="flex items-center space-x-1 mb-4">
              <Skeleton width="40px" height="14px" rounded="md" />
              <Skeleton width="60px" height="14px" rounded="md" />
            </div>

            {/* Price skeleton */}
            <div className="flex flex-col items-end w-full lg:mt-2">
              <Skeleton width="80px" height="24px" rounded="md" className="mb-2" />
              <Skeleton width="60px" height="16px" rounded="md" />
            </div>
          </div>

          {/* Discount badge skeleton */}
          <div className="absolute bottom-4 left-4">
            <Skeleton width="60px" height="24px" rounded="full" />
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;

