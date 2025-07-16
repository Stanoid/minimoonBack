'use client';

import React, { useEffect, useState, useRef } from 'react';
import {CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'
import { Spinner, Button, Tooltip } from '@nextui-org/react';
import { FaArrowLeft, FaArrowRight, FaStar, FaHeart } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Theme } from '../local'; 
import Image from 'next/image';

export default function MostDemanded() {
  const [subcats, setSubcats] = useState([]);
  const [selectedSubcat, setSelectedSubcat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingSubcats, setLoadingSubcats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loading, setLoading] = useState(false); 

  const productScrollRef = useRef(null);
  const router = useRouter();
  const CURRENCY = "د.ج"; 

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`${API_URL}subcatagories?func=getTopSubcats`);
        const data = await res.json();
        setSubcats(data);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      } finally {
        setLoadingSubcats(false);
      }
    };
    fetchSubcategories();
  }, []);
  
  
  console.log(IMG_URL)
  
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

        console.log("most demanded", data.images)
    
        // console.log(`ful image url ${IMG_URL}${data.data.images[0]?.formats?.medium?.url}`)
        
        const finalProducts = selectedSubcat ? (data ? [data] : []) : (data || []);
        setProducts(finalProducts);
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
      const scrollAmount = productScrollRef.current.offsetWidth;
      productScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (productScrollRef.current) {
      const scrollAmount = productScrollRef.current.offsetWidth;
      productScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 ">
      <h2 className="text-xl text-center font-bold text-gray-800 mb-6">الاكثر طلبا</h2> 

      {!loadingSubcats && (
        <div className="flex gap-2 text-sm flex-wrap justify-center mb-6">
          {subcats.map((subcat) => (
            <Button
              key={subcat.id}
              size="sm"
              dir="rtl"
              className={`rounded-md border ${
                selectedSubcat?.id === subcat.id
                  ? 'bg-white border-gray-300 text-gray-800'
                  : 'bg-moon-200 border-pink-100 text-gray-700'
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
                ? 'bg-white border-gray-300 text-gray-800' 
                : 'bg-moon-200 border-pink-100 text-gray-700' 
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
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="p-2 rounded-full h-[48px] w-[48px] flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(270deg, rgba(224, 36, 36, 0.4), rgba(224, 36, 36, 0))' }}
          >
            <FaArrowLeft size={18} />
          </button>

          <div
            ref={productScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-4 sm:px-8 max-w-screen-xl w-full scrollbar-hide"
            dir="ltr"
          >
            {products.map((product) => {
              const varient = product.varients?.[0];
              const discount =
                varient?.old_price > varient?.price
                  ? Math.round(((varient.old_price - varient.price) / varient.old_price) * 100)
                  : null;

              const getUniqueColors = (product) => {
                if (!Array.isArray(product.varients)) {
                  return [];
                }
                const seenColorIds = new Set();
                const uniqueColors = [];
                for (let i = 0; i < product.varients.length; i++) {
                  const variant = product.varients[i];
                  const color = variant?.colors?.[0];
                  if (color && !seenColorIds.has(color.id)) {
                    seenColorIds.add(color.id);
                    uniqueColors.push(color);
                  }
                }
                return uniqueColors;
              };

              const uniqueColors = getUniqueColors(product);


              return (
                <motion.div
                  key={product.id}
                  onClick={() => {
                    setLoading(true);
                    router.push(`/products?pid=${product.id}`);
                  }}
                  className="lg:w-[270.25px] lg:h-[501px] w-[167px] h-[330px] rounded-lg border border-gray-200 bg-white shadow-md cursor-pointer flex flex-col overflow-hidden relative shrink-0 snap-start"
                >
                  <div className="relative mx-h-[169px] h-full lg:max-w-[308px] lg:max-h-[308px] w-full">
                    {loading ? ( // This 'loading' is from the MostDemanded component's state
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
                        <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook"><div></div><div></div><div></div></div>
                      </div>
                    ) : (
                      <>
                        <img
                                   fill
                                   objectFit='cover'
                                   className='rounded-t-lg' 
                           
                                   // src={IMG_URL + props.data?.images?.[0]?.formats?.thumbnail?.url}
                                  src={`${IMG_URL}${product.data?.images[0]?.formats?.medium?.url}`} 
                                     
                                   alt={product.data?.name_ar}
                                 />
                        <div className="absolute top-2 left-2 p-2 bg-[#f7a0983d] rounded-md shadow-sm z-10">
                          <FaHeart className="text-gray-400 text-lg" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Product Details Section */}
                  <div dir="ltr" className="flex flex-col p-2 lg:max-h-[193px] h-full max-w-[167px] lg:max-w-[308px] w-full bg-white items-end">
                    {/* Product Name/Code - Conditional Display */}
                    <div className="lg:text-lg text-base hidden lg:flex sm:hidden lg:flex-row font-medium mb-2 text-gray-800 text-right">
                      {product.name_ar} - {product.code}
                    </div>
                    <div className="lg:text-lg lg:hidden flex flex-col font-medium mb-2 text-gray-800 text-right">
                      <h>{product.code}</h>
                      <h>{product.name_ar}</h>
                    </div>

                    {/* Colors and Rating */}
                    <div className="flex flex-col items-end mb-4">
                      <div className="flex items-center mb-2">
                        {uniqueColors.map((color) => (
                          <div key={color.id} className="ml-1">
                            <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar}>
                              <div
                                style={{ backgroundColor: color.colorCode }}
                                className="h-[14px] w-[14px] lg:h-[16px] lg:w-[16px] rounded-full border border-gray-200"
                              ></div>
                            </Tooltip>
                          </div>
                        ))}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="text-xs text-gray-600">(3.4k)</div>
                        {[...Array(4)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                        <FaStar className="text-gray-300 text-sm" />
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex flex-col items-end w-[276px] lg:mt-2 h-[64px]">
                      <div className="text-lg font-bold text-gray-900 flex items-baseline">
                        <div className="ml-1">{CURRENCY}</div>
                        <div>{varient?.price || 6950}</div>
                      </div>
                      {varient?.old_price > varient?.price && (
                        <div className="text-sm text-gray-300 line-through flex items-baseline">
                          <div className="ml-1">{CURRENCY}</div>
                          <div>{varient.old_price}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Discount Badge */}
                  {discount && (
                    <span className="absolute bottom-4 left-4 bg-moon-100 text-moon-200 text-xs font-bold px-3 py-1 rounded-full z-10">
                      {`%${discount} خصم`}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="p-2 rounded-full h-[48px] w-[48px] flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(270deg, rgba(224, 36, 36, 0.4), rgba(224, 36, 36, 0))' }}
          >
            <FaArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">لا توجد منتجات متاحة حالياً.</div>
      )}
    </div>
  );
}