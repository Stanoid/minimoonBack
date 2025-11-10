'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

/**
 * Product Page Skeleton - For product detail pages
 */
const ProductPageSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <Skeleton 
            width="100%" 
            height="500px" 
            rounded="lg"
            className="lg:h-[600px] h-[400px]"
          />
          
          {/* Thumbnail Images */}
          <div className="flex gap-2">
            <Skeleton width="80px" height="80px" rounded="md" />
            <Skeleton width="80px" height="80px" rounded="md" />
            <Skeleton width="80px" height="80px" rounded="md" />
            <Skeleton width="80px" height="80px" rounded="md" />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Skeleton width="80%" height="32px" rounded="md" className="mb-2" />
            <Skeleton width="60%" height="24px" rounded="md" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <Skeleton width="120px" height="36px" rounded="md" />
            <Skeleton width="100px" height="24px" rounded="md" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton width="100%" height="16px" rounded="md" />
            <Skeleton width="100%" height="16px" rounded="md" />
            <Skeleton width="90%" height="16px" rounded="md" />
            <Skeleton width="95%" height="16px" rounded="md" />
          </div>

          {/* Color Selection */}
          <div>
            <Skeleton width="100px" height="20px" rounded="md" className="mb-3" />
            <div className="flex gap-2">
              <Skeleton width="40px" height="40px" rounded="full" />
              <Skeleton width="40px" height="40px" rounded="full" />
              <Skeleton width="40px" height="40px" rounded="full" />
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <Skeleton width="80px" height="20px" rounded="md" className="mb-3" />
            <div className="flex gap-2">
              <Skeleton width="60px" height="40px" rounded="md" />
              <Skeleton width="60px" height="40px" rounded="md" />
              <Skeleton width="60px" height="40px" rounded="md" />
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 items-center">
            <Skeleton width="120px" height="48px" rounded="md" />
            <Skeleton width="200px" height="48px" rounded="md" />
          </div>

          {/* Additional Info */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Skeleton width="100%" height="16px" rounded="md" />
            <Skeleton width="90%" height="16px" rounded="md" />
            <Skeleton width="95%" height="16px" rounded="md" />
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <Skeleton width="150px" height="40px" rounded="none" />
          <Skeleton width="150px" height="40px" rounded="none" />
        </div>
        <div className="space-y-3">
          <Skeleton width="100%" height="16px" rounded="md" />
          <Skeleton width="100%" height="16px" rounded="md" />
          <Skeleton width="90%" height="16px" rounded="md" />
          <Skeleton width="100%" height="16px" rounded="md" />
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <Skeleton width="200px" height="28px" rounded="md" className="mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} width="100%" height="300px" rounded="lg" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPageSkeleton;

