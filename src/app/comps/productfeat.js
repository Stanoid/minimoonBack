import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { FaList } from 'react-icons/fa';
import { API_URL } from '../local';

function ProductFeat(props) {
  const [cat, setCat] = useState([]);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      getCats();
    }
  }, []);

  const getCats = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_URL}sections?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("sections data:", data);
        setCat(data[0]?.catagories || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const CategoryCard = ({ img, name, link, isLarge = false }) => (
    <div
      className={`relative rounded-lg overflow-hidden shadow-lg cursor-pointer  
        ${isLarge ? 'col-span-2 row-span-2 min-h-[400px] lg:min-h-[500px]' : 'min-h-[200px] lg:min-h-[240px]'}
        flex items-end
      `}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={() => link && window.location.assign(link)}
    >
      <div
        className="absolute  bottom-0 left-0 right-0 p-4 flex items-center justify-center"
        style={{
          height: '84px',
          background: 'linear-gradient(180deg, rgba(225, 109, 100, 0) 0%, rgba(67, 17, 13, 0.6) 100%)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      >
        <h3 className={`text-white font-bold text-center w-full z-10
          ${isLarge ? 'text-3xl' : 'text-xl'}
        `}>
          {name}
        </h3>
      </div>
    </div>
  );

  const largeCategory = cat.find(c => c.name_ar === 'بجامة 3 قطع') || {
    img: '/offers/bajama3.jpg',
    name_ar: 'بجامة 3 قطع',
    id: 'default-large'
  };
  
  const robaatCategory = cat.find(c => c.name_ar === 'روبات') || {
    img: '/offers/robaat.jpg',
    name_ar: 'روبات',
    id: 'default-robaat'
  };
  
  const hawamelCategory = cat.find(c => c.name_ar === 'حوامل') || {
    img: '/offers/minimoonpreg.jpeg',
    name_ar: 'حوامل',
    id: 'default-hawamel'
  };
  
  const hagemKabeerCategory = cat.find(c => c.name_ar === 'حجم كبير') || {
    img: '/offers/minimoonbigsdizes.jpeg',
    name_ar: 'حجم كبير',
    id: 'default-hagem-kabeer'
  };
  
  const bajama5QetaaCategory = cat.find(c => c.name_ar === 'بجامة 5 قطع') || {
    img: '/offers/minimoonbigsdizes.jpeg',
    name_ar: 'بجامة 5 قطع',
    id: 'default-bajama5'
  };
  
  return (
    <div dir='rtl' className="py-4 w-full max-w-7xl mx-auto sm:px-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-black text-gray-900">أفضل الأقسام</h2>
        <a href="/products" className="text-sm text-gray-700 hover:text-moon-200 transition-colors duration-200">
          مشاهدة كل المنتجات
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
        {largeCategory && (
          <CategoryCard
            img={largeCategory.img}
            name={largeCategory.name_ar}
            link={`/categories?cid=${largeCategory.id}`}
            isLarge={true}
          />
        )}

        {robaatCategory && (
          <CategoryCard
            img={robaatCategory.img}
            name={robaatCategory.name_ar}
            link={`/categories?cid=${robaatCategory.id}`}
          />
        )}
        {hawamelCategory && (
          <CategoryCard
            img={hawamelCategory.img}
            name={hawamelCategory.name_ar}
            link={`/categories?cid=${hawamelCategory.id}`}
          />
        )}
        {hagemKabeerCategory && (
          <CategoryCard
            img={hagemKabeerCategory.img}
            name={hagemKabeerCategory.name_ar}
            link={`/categories?cid=${hagemKabeerCategory.id}`}
          />
        )}
        {bajama5QetaaCategory && (
          <CategoryCard
            img={bajama5QetaaCategory.img}
            name={bajama5QetaaCategory.name_ar}
            link={`/categories?cid=${bajama5QetaaCategory.id}`}
          />
        )}
      </div>
    </div>
  );
}

export default ProductFeat;