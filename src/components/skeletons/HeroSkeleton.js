'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

/**
 * Hero Section Skeleton - For hero banners and sliders
 */
const HeroSkeleton = ({ variant = 'default' }) => {
  if (variant === 'slider') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full relative"
      >
        <Skeleton 
          width="100%" 
          height="400px" 
          rounded="lg"
          className="lg:h-[500px] md:h-[400px] h-[250px]"
        />
      </motion.div>
    );
  }

  if (variant === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-6 gap-1.5"
      >
        {/* Large banner */}
        <div className="lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6 hidden lg:flex">
          <Skeleton width="100%" height="400px" rounded="md" />
        </div>
        
        {/* Medium banners */}
        <div className="lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6">
          <Skeleton width="100%" height="200px" rounded="md" className="mb-1.5" />
          <Skeleton width="100%" height="200px" rounded="md" />
        </div>
        
        {/* Small banners */}
        <div className="lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6 hidden lg:flex flex-col gap-1.5">
          <Skeleton width="100%" height="130px" rounded="md" />
          <Skeleton width="100%" height="130px" rounded="md" />
          <Skeleton width="100%" height="130px" rounded="md" />
        </div>
      </motion.div>
    );
  }

  // Default hero skeleton
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full relative"
    >
      <Skeleton 
        width="100%" 
        height="500px" 
        rounded="lg"
        className="lg:h-[600px] md:h-[400px] h-[300px]"
      />
    </motion.div>
  );
};

export default HeroSkeleton;

