import React, { useEffect, useState, useContext } from 'react';
import { CURRENCY, Theme } from '../local';
import { CartCon } from '../contexts/cartContext';

// Basic checkmark icon
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

function OptionEL(props) {
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const { useNotifi } = useContext(CartCon);

  useEffect(() => {
    let size = [];
    let sizeObjects = [];
    let colorList = [];

    props.vars.forEach((element) => {
      const sizeData = element.attributes.sizes.data[0];
      const colorData = element.attributes.colors.data[0];
      colorList.push({
        sizeid: sizeData.id,
        varid: element.id,
        color: colorData,
        qty: element.attributes.stock,
      });

      if (!size.includes(sizeData.id)) {
        size.push(sizeData.id);
        sizeObjects.push(sizeData);
      }
    });

    setSizes(sizeObjects);
    setSizeId(sizeObjects[0]?.id || null);
    setColors(colorList);

    const initial = colorList.find((c) => c.sizeid === sizeObjects[0]?.id);
    if (initial) props.varselect(initial.varid);
  }, [props.vars]);

  const handleSizeSelect = (id) => {
    setSizeId(id);
    const match = colors.find((el) => el.sizeid === id);
    if (match) props.varselect(match.varid);
  };

  return (
    <div className="flex flex-col justify-between items-start space-y-3">
      {/* Sizes */}
      <div className="flex flex-col items-start w-full">
        <div className="font-bold text-lg mb-2">اختر المقاس</div>
        <div className="flex flex-wrap justify-start w-full text-sm">
          {sizes?.map((vari) => (
            <div
              key={vari.id}
              onClick={() => handleSizeSelect(vari.id)}
              className={`${
                sizeId === vari.id ? 'border-moon-200 shadow-md' : 'border-gray-300'
              } border-[1px] cursor-pointer mt-2 mr-2 px-4 py-2 rounded-md`}
              style={{
                backgroundColor: sizeId === vari.id ? Theme.primary : 'white',
                color: sizeId === vari.id ? 'white' : '#6B7280',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {vari.attributes.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col items-start w-full">
        <div className="font-bold text-lg mb-2">اللون</div>
        <div className="flex flex-wrap justify-start w-full space-x-3">
          {colors?.map((color) =>
            color.sizeid === sizeId ? (
              <div
                key={color.varid}
                onClick={() => {
                  color.qty <= 0
                    ? useNotifi('error', 'نفذت الكمية من هذا الخيار')
                    : props.varselect(color.varid);
                }}
                className={`flex flex-col justify-center items-center space-y-1 p-2 rounded-lg cursor-pointer transition-all ${
                  props.vari === color.varid
                    ? 'border lg:w-[68] shadow-lg bg-red-100'
                    : 'border-4 border-transparent shadow-none'
                }`}
                style={{
                  opacity: color.qty <= 0 ? 0.3 : 1,
                  borderColor: props.vari === color.varid ? Theme.primary : 'transparent',
                  backgroundColor: props.vari === color.varid ? '#fde0e6' : 'transparent',
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color.color.attributes.colorCode }}
                >
                  {props.vari === color.varid && <CheckIcon />}
                </div>
                <div
                  style={{
                    color: props.vari === color.varid ? Theme.primary : Theme.primaryDark,
                  }}
                  className="font-semibold text-xs whitespace-nowrap"
                >
                  {color.color.attributes.name_ar}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default OptionEL;
