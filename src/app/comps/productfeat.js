'use client';

import React, { useState, useEffect } from 'react';
import { API_URL } from '../local';
import { motion } from 'framer-motion';

function ProductFeat() {
  const [subcats, setSubcats] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

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
      const res = await fetch(`${API_URL}subcatagories?func=getTopSecSubcats`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log("Top subcategories:", data);
      setSubcats(data);
    } catch (err) {
      console.error("Error fetching top subcategories:", err);
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

  const CategoryCard = ({ img, name, link, isLarge = false }) => (
    <div
      onClick={() => link && window.location.assign(link)}
      className={`relative rounded-lg overflow-hidden shadow-lg cursor-pointer
        ${isLarge ? 'col-span-2 row-span-2 min-h-[300px] lg:min-h-[350px]' : 'min-h-[150px] lg:min-h-[180px]'}
        flex items-end`}
    >
   <motion.img
  key={img}
  src={img}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  className="absolute inset-0 w-full h-full object-cover"
/>


      <div
        className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center"
        style={{
          height: '84px',
          background: 'linear-gradient(180deg, rgba(225, 109, 100, 0) 0%, rgba(67, 17, 13, 0.6) 100%)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      >
        <h3
          className={`text-white font-bold text-center w-full z-10 ${
            isLarge ? 'text-2xl' : 'text-lg'
          }`}
        >
          {name}
        </h3>
      </div>
    </div>
  );

  const visibleSubcats = [];
  for (let i = 0; i < 5; i++) {
    visibleSubcats.push(subcats[(startIndex + i) % subcats.length]);
  }

  return (
    <div dir="rtl" className="py-4 w-full max-w-7xl mx-auto sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-black text-gray-900">أفضل الأقسام</h2>
        <a
          href="/products"
          className="text-sm text-gray-700 hover:text-moon-200 transition-colors duration-200"
        >
          مشاهدة كل المنتجات
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
        {visibleSubcats.map((subcat, idx) =>
          subcat ? (
            <CategoryCard
              key={subcat.id + '-' + idx}
              img={getImageUrl(subcat.img)}
              name={subcat.name_ar}
              link={`/categories?cid=${subcat.id}`}
              isLarge={idx === 0}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default ProductFeat;
