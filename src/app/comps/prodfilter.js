'use client';
import { useEffect, useState } from 'react';
import { RiCornerDownLeftFill } from 'react-icons/ri';
import {API_URL } from '../local';
export default function SidebarFilter({ onFilterChange }) {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const sizeRes = await fetch(`${API_URL}products?func=getSizesFilter`);
      const sizeData = await sizeRes.json();
      console.log("Sizes data:", sizeData);
  
      const colorRes = await fetch(`${API_URL}products?func=getColorsFilter`);
      const colorData = await colorRes.json();
      console.log(" Colors data:", colorData);
  
      setSizes(Array.isArray(sizeData) ? sizeData : sizeData?.data || []);
      setColors(Array.isArray(colorData) ? colorData : colorData?.data || []);
    } catch (err) {
      console.error(" Failed to fetch filters", err);
    }
  };
  
  

  const toggleSize = (id) => {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleFilterSubmit = () => {
    onFilterChange({
      sizes: selectedSizes.join(','),
      colors: selectedColors.join(','),
      priceRange: `${priceRange.min},${priceRange.max}`,
    });
  };

  return (
    <aside className="w-full sm:w-64 bg-white p-4 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4 text-right">فلترة المنتجات</h2>

      {/* Sizes */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-right">الأحجام</h3>
        <div className="flex flex-wrap gap-2 justify-end">
          {sizes && sizes?.map((size) => (
            <button
              key={size.id}
              onClick={() => toggleSize(size.id)}
              className={`border rounded px-3 py-1 ${
                selectedSizes.includes(size.id)
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              {size.name_ar}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-right">الألوان</h3>
        <div className="flex flex-wrap gap-2 justify-end">
          {colors &&colors.map((color) => (
            <div
              key={color.id}
              onClick={() => toggleColor(color.id)}
              style={{
                backgroundColor: color.colorCode,
                width: 24,
                height: 24,
                border:
                  selectedColors.includes(color.id)
                    ? '2px solid black'
                    : '1px solid #ccc',
                cursor: 'pointer',
                borderRadius: '50%',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-right">السعر</h3>
        <div className="flex justify-between items-center gap-2">
          <input
            type="number"
            className="border p-1 w-full text-right"
            placeholder="من"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
            }
          />
          <input
            type="number"
            className="border p-1 w-full text-right"
            placeholder="إلى"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <button
        className="bg-black text-white px-4 py-2 rounded mt-4 w-full"
        onClick={handleFilterSubmit}
      >
        تأكيد
      </button>
    </aside>
  );
}
