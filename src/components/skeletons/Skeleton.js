'use client';
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Base Skeleton Component with shimmer animation
 * @param {string} width - Width of skeleton (e.g., "100%", "300px", "w-full")
 * @param {string} height - Height of skeleton (e.g., "200px", "h-64")
 * @param {string} rounded - Border radius (e.g., "md", "lg", "xl", "full")
 * @param {string} className - Additional Tailwind classes
 * @param {boolean} animate - Whether to show shimmer animation (default: true)
 */
const Skeleton = ({ 
  width = "100%", 
  height = "20px", 
  rounded = "md", 
  className = "",
  animate = true 
}) => {
  const widthClass = width.includes('%') || width.includes('px') || width.includes('rem') || width.includes('vw') 
    ? '' 
    : width;
  
  const heightClass = height.includes('px') || height.includes('rem') || height.includes('vh')
    ? ''
    : height;

  const style = {
    width: widthClass ? undefined : width,
    height: heightClass ? undefined : height,
  };

  // Handle rounded corners properly
  const roundedClasses = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    'full': 'rounded-full',
    't-lg': 'rounded-t-lg',
    't-md': 'rounded-t-md',
  };

  const roundedClass = roundedClasses[rounded] || `rounded-${rounded}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={[
        'bg-gray-200',
        roundedClass,
        widthClass,
        heightClass,
        animate ? 'skeleton-shimmer' : '',
        className
      ].filter(Boolean).join(' ')}
      style={style}
      aria-label="Loading..."
    />
  );
};

export default Skeleton;

