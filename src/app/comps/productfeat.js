'use client';

import React, { useState, useEffect } from 'react';
import { API_URL } from '../local';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useI18n } from '../lib/i18n';
import { useRef } from 'react';
import { ProductCardSkeleton } from '../../components/skeletons';

function ProductFeat() {
  const { t, direction } = useI18n();
  const [subcats, setSubcats] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchTopSubcats();
  }, []);

  useEffect(() => {
    if (subcats.length === 0) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % subcats.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [subcats]);

  const fetchTopSubcats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}subcatagories?func=getTopSecSubcats`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log("Top subcategories:", data);
      setSubcats(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching top subcategories:", err);
      setLoading(false);
    }
  };

  const getImageUrl = (img) => {
    if (!img || !img.url) {
      return 'https://place-hold.it/300x500/666/fff/000.gif';
    }
    let url = img.url;
    if (!url.startsWith('http')) {
      const base = API_URL.replace(/\/api\/?$/, '');
      return base + url;
    }
    return url;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  const imageVariants = {
    initial: {
      scale: 1.2,
      opacity: 0.8,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.15,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0.4 },
    hover: {
      opacity: 0.75,
      transition: {
        duration: 0.3,
      },
    },
  };

  const textVariants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const CategoryCard = ({ img, name, link, isLarge = false, index = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        ref={containerRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          try {
            if (link) {
              window.location.assign(link);
            }
          } catch (err) {
            console.error('Error navigating:', err);
          }
        }}
        className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group
          ${isLarge ? 'col-span-2 row-span-2 min-h-[300px] lg:min-h-[400px]' : 'min-h-[180px] lg:min-h-[220px]'}
          flex items-end
          bg-gradient-to-br from-gray-50 to-gray-100
          border border-gray-200/50
          backdrop-blur-sm
          transition-all duration-300
          ${isHovered ? 'shadow-2xl ring-2 ring-moon-200/50' : ''}`}
        style={{
          perspective: '1000px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full"
            variants={imageVariants}
            initial="initial"
            animate={isHovered ? "hover" : "animate"}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover"
              style={{
                filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.95) saturate(1)',
                transition: 'filter 0.4s ease-out',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay with better colors */}
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />

        {/* Shine effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            style={{
              transform: 'skewX(-20deg)',
            }}
          />
        )}

        {/* Content */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          whileHover="hover"
          className={`absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex items-center justify-center z-10
            ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <h3
            className={`text-white font-bold text-center w-full z-10
              ${isLarge ? 'text-xl lg:text-3xl' : 'text-base lg:text-xl'}
              drop-shadow-lg
              transition-all duration-300
              ${isHovered ? 'scale-105' : ''}`}
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            {name}
          </h3>
        </motion.div>

        {/* Decorative corner accent */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{
            delay: 0.5 + index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        />
      </motion.div>
    );
  };

  const visibleSubcats = [];
  for (let i = 0; i < 5; i++) {
    const subcat = subcats[(startIndex + i) % subcats.length];
    if (subcat) {
      visibleSubcats.push(subcat);
    }
  }

  return (
    <div
      ref={containerRef}
      dir={direction}
      className="py-8 lg:py-12 w-full max-w-7xl mx-auto sm:px-6"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(249, 250, 251, 0.5), transparent)',
      }}
    >
      {/* Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'} justify-between items-center mb-8 lg:mb-12`}
      >
        <motion.h2
          initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-2xl lg:text-4xl font-bold text-gray-900 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
          style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('bestSections')}
        </motion.h2>
        <motion.a
          initial={{ opacity: 0, x: direction === 'rtl' ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === 'rtl' ? -30 : 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          href="/products"
          className={`text-sm lg:text-base text-gray-600 hover:text-moon-200 transition-all duration-300 font-medium
            ${direction === 'rtl' ? 'text-left' : 'text-right'}
            flex items-center gap-2
            group`}
        >
          <span>{t('viewAllProducts')}</span>
          <motion.span
            animate={{ x: direction === 'rtl' ? [-5, 0, -5] : [5, 0, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>

      {/* Grid with stagger animation */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
          <ProductCardSkeleton count={5} />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr"
        >
          {visibleSubcats.map((subcat, idx) =>
            subcat ? (
              <CategoryCard
                key={subcat.id + '-' + idx + '-' + startIndex}
                img={getImageUrl(subcat.img)}
                name={subcat.name_ar || subcat.name || 'Category'}
                link={`/categories?cid=${subcat.id}`}
                isLarge={idx === 0}
                index={idx}
              />
            ) : null
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ProductFeat;
