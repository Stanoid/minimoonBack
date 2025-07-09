'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../local';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function SidebarFilter({ onFilterChange }) {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedColors, setSelectedColors] = useState(new Set());
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [isSizesOpen, setIsSizesOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [sizeRes, colorRes, subcat] = await Promise.all([
          fetch(`${API_URL}products?func=getSizesFilter`),
          fetch(`${API_URL}products?func=getColorsFilter`),
        // fetch(`${API_URL}subcatagories?func=getAllSubcat`)
        
        ]);

        const sizeData = await sizeRes.json();
        const colorData = await colorRes.json();
const subcatData =  subcat
console.log("subcatsdddddddddddddddddd",subcatData);
        const newSizes = Array.isArray(sizeData) ? sizeData : sizeData?.data || [];
        const newColors = Array.isArray(colorData) ? colorData : colorData?.data || [];

        if (sizes.length === 0) setSizes(newSizes);
        if (colors.length === 0) setColors(newColors);
      } catch (err) {
        console.error('Failed to fetch filters', err);
      }
    };

    fetchFilters();
  }, [sizes.length, colors.length]);

  const handleSizeClick = (sizeId) => {
    const newSelectedSizes = new Set(selectedSizes);
    newSelectedSizes.has(sizeId) ? newSelectedSizes.delete(sizeId) : newSelectedSizes.add(sizeId);
    setSelectedSizes(newSelectedSizes);
  };

  const handleColorClick = (colorId) => {
    const newSelectedColors = new Set(selectedColors);
    newSelectedColors.has(colorId) ? newSelectedColors.delete(colorId) : newSelectedColors.add(colorId);
    setSelectedColors(newSelectedColors);
  };

  const handleFilterSubmit = () => {
    onFilterChange({
      sizes: Array.from(selectedSizes).join(','),
      colors: Array.from(selectedColors).join(','),
      priceRange: `${priceRange.min},${priceRange.max}`,
    });
  };

  return (
    <aside dir='rtl' className="w-full max-w[308] sm:w-64 mt-[48px] bg-white p-4 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-right">فلترة المنتجات</h2>

      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          className="flex justify-between items-center w-full pb-2 text-right cursor-pointer group"
          onClick={() => setIsSizesOpen(!isSizesOpen)}
        >
          <h3 className="font-semibold text-right text-moon-200">المقاس</h3>
          {isSizesOpen ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {isSizesOpen && (
          <div className="flex flex-wrap gap-2 justify-end pt-2 animate-fadeIn">
            {sizes.slice(0, 30).map((size) => {
              const isSelected = selectedSizes.has(size.id);
              return (
                <button
                  key={size.id}
                  className={`
                    min-w-[36px] px-2 py-1 text-xs text-center rounded-md transition-all
                    ${isSelected
                      ? 'bg-red-100 border-2 border-pink-500 text-pink-700'
                      : 'bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200'}
                  `}
                  onClick={() => handleSizeClick(size.id)}
                >
                  {size.name_ar}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          className="flex justify-between items-center w-full pb-2 text-right cursor-pointer group"
          onClick={() => setIsColorsOpen(!isColorsOpen)}
        >
          <h3 className="font-semibold text-right text-moon-200">الألوان</h3>
          {isColorsOpen ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {isColorsOpen && (
          <div className="flex flex-wrap gap-2 justify-end pt-2 animate-fadeIn">
            {colors.slice(0, 30).map((color) => {
              const isSelected = selectedColors.has(color.id);
              const isWhite =
                ['#FFFFFF', '#FFF', 'white'].includes(color.colorCode.toLowerCase());
              return (
                <div
                  key={color.id}
                  className={`
                    relative w-7 h-7 rounded-full cursor-pointer transition transform hover:scale-110
                    ${isSelected ? 'border-2 border-pink-500' : 'border border-gray-300'}
                    ${isWhite ? 'border-gray-400' : ''}
                  `}
                  style={{ backgroundColor: color.colorCode }}
                  title={color.name_ar}
                  onClick={() => handleColorClick(color.id)}
                ></div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mb-4 border-b border-gray-200 pb-4">
        <h3 className="font-semibold mb-2 text-right">السعر</h3>
        <div className="flex justify-between items-center gap-2">
          <input
            type="number"
            className="border p-2 w-full text-right text-sm rounded"
            placeholder="من"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })
            }
          />
          <input
            type="number"
            className="border p-2 w-full text-right text-sm rounded"
            placeholder="إلى"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <button
        className="bg-white border border-moon-200  text-moon-200 text-sm px-4 py-2 rounded-md mt-4 w-full transition"
        onClick={handleFilterSubmit}
      >
        تأكيد
      </button>
    </aside>
  );
}
