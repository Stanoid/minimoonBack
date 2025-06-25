'use client';

import React, { useEffect, useState, useRef } from 'react';
import Product from '../comps/product';
import { API_URL } from '../local';
import { Spinner, Button } from '@nextui-org/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function MostDemanded() {
  const [subcats, setSubcats] = useState([]);
  const [selectedSubcat, setSelectedSubcat] = useState(null); 
  const [products, setProducts] = useState([]);
  const [loadingSubcats, setLoadingSubcats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const productScrollRef = useRef(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`${API_URL}subcatagories?func=getTopSubcats`);
        const data = await res.json();
        console.log("API response for subcategories:", data); // <--- Add this line

        setSubcats(data);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      } finally {
        setLoadingSubcats(false);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        let url = `${API_URL}products?func=getTopSellerPerSubcat`;
        if (selectedSubcat) {
          url += `&subcatid=${selectedSubcat.id}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        const finalProducts = selectedSubcat ? (data ? [data] : []) : (data || []);
        setProducts(finalProducts);
        console.log("Fetched products:", finalProducts)
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [selectedSubcat]);


  const scrollLeft = () => {
    if (productScrollRef.current) {
      productScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (productScrollRef.current) {
      productScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="text-xl  flex justify-center items-center font-bold text-right text-gray-800 mb-6">
        الأكثر طلباً
      </div>

      {loadingSubcats ? null : (
        <div className="flex gap-2 text-sm flex-wrap justify-center mb-6">
          {subcats && subcats.map((subcat) => (
            <Button
              key={subcat.id}
              size="sm"
              dir="rtl"
              className={`rounded-md border ${
                selectedSubcat?.id === subcat.id
                  ? 'bg-white border border-gray-300 text-gray-800'
                  : 'bg-pink-100 border border-pink-100 text-gray-700'
              }`}
              onClick={() => setSelectedSubcat(subcat)}
            >
              {subcat.subcategory?.name_ar}
            </Button>
          ))}

          <Button
            size="sm"
            className={`rounded-md border ${
              selectedSubcat === null
                ? 'bg-pink-100 border border-moon-200 text-moon-200'
                : 'bg-pink-100 border border-pink-100 text-gray-700'
            }`}
            onClick={() => setSelectedSubcat(null)}
          >
            الكل
          </Button>
        </div>
      )}

      {loadingProducts ? (
        <div className="flex justify-center py-10">
          <Spinner color="danger" size="lg" />
        </div>
      ) : products.length > 0 ? (
        <div className="flex items-center gap-2">
        <button
  onClick={scrollLeft}
  aria-label="Scroll left products"
  className="p-2 rounded-full backdrop:blur-sm lg:h-[60px] flex justify-center  items-center lg:w-[60px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
  style={{
    background: 'linear-gradient(270deg, rgba(224, 36, 36, 0.48) 0%, rgba(224, 36, 36, 0) 100%)',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = 'linear-gradient(270deg, rgba(251, 207, 232, 0.48) 0%, rgba(255, 255, 255, 0) 100%)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = 'linear-gradient(270deg, rgba(251, 207, 232, 0.48) 0%, rgba(255, 255, 255, 0) 100%)';
  }}
>
            <FaArrowLeft size={20} />
          </button>

          <div
            ref={productScrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide max-w-[90vw]"
            dir="ltr"
          >
            {products.map((product) => (
              <div key={product.id} className="lg:max-[] ">
                <Product data={product} />
              </div>
            ))}
          </div>

          <button
  onClick={scrollLeft}
  aria-label="Scroll left products"
  className="p-2 rounded-full lg:h-[60px] flex justify-center  items-center lg:w-[60px] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
  style={{
    background: 'linear-gradient(270deg, rgba(251, 207, 232, 0.48) 0%, rgba(255, 255, 255, 0) 100%)',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = 'linear-gradient(270deg, rgba(224, 36, 36, 0.7) 0%, rgba(224, 36, 36, 0.1) 100%)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = 'linear-gradient(270deg, rgba(224, 36, 36, 0.48) 0%, rgba(224, 36, 36, 0) 100%)';
  }}
>
            <FaArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">لا توجد منتجات متاحة حالياً.</div>
      )}
    </div>
  );
}
