'use client'

import React from 'react'

import Styles from "../styles/Home.module.css"
import { Theme, CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary';
import { Spinner } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { FaHeart, FaStar } from 'react-icons/fa6'
import { MAIN_STYLE } from '../styles/style'
import Head from 'next/head'
import { BsStarFill, BsCheck2Circle, BsCheckCircleFill, BsCartPlusFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'



export default function Product(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cimg, setCimg] = useState("");
  const [colors, setColors] = useState(null);

  useEffect(() => {
    colorDisplay()
  }, [])


  const colorDisplay = () => {
    var colo = []
    var colob = []

    for (let i = 0; i < props.data.varients.length; i++) {

      if (colo.includes(props.data.varients[i].colors[0].id)) {

      } else {
        colo.push(props.data.varients[i].colors[0].id);
        colob.push(props.data.varients[i].colors[0]);

      }

    }


    setColors(colob);
  }


  function oldPrice(newPrice, discountPercentage) {
    if (discountPercentage === 0) return 0;
    const discountFactor = 1 - (discountPercentage / 100);
    const oldPrice = newPrice / discountFactor;
    return parseInt(oldPrice);
  }

  return (
    <motion.div
      onClick={() => {
        setLoading(true);
        router.push(`/products?pid=${props.data.id}`)
      }}
      className="
          lg:w-[308px] lg:h-[501px] w-[167px] h-[330px]  rounded-lg border border-gray-200 bg-white shadow-md cursor-pointer flex flex-col overflow-hidden relative"
    >

      {/* Image Section */}
      <div className='relative w-full' style={{ height: '60%' }}>
        {loading ? (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 z-20'>
            <div style={{ zIndex: 10 }}>
              <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook"><div></div><div></div><div></div></div>
            </div>
          </div>
        ) : (
          <>
            <CldImage
              fill
              objectFit='cover'
              className='rounded-t-lg'
              src={JSON.parse(props.data.img)[0].thumb}
              alt="Product Image"
            />
            {/* Wishlist Heart Icon - Adjusted positioning to match image */}
            <div className="absolute top-3 right-3 p-2 bg-[#f7a0983d] rounded-md shadow-sm z-10">
              <FaHeart className="text-gray-400 text-lg" />
            </div>
          </>
        )}
      </div>

      {/* Product Details Section - Re-designed to match image exactly */}
      {/* Figma "content excluding price layout" dimensions: width: 238.25; height: 85; gap: 3; */}
      {/* We'll aim for flexible height and use 'gap' where appropriate */}
      <div dir="ltr" className="flex flex-col justify-between px-2 py-1 flex-1 gap-1"> {/* Adjusted padding and added gap-1 */}
        {/* Product Name and Code */}
        {/* Adjusted font size for name to be smaller */}
        <div className="text-xs lg:text-sm font-medium text-gray-800 text-right"> {/* Removed mb-1, let gap handle spacing */}
          {`${props.data && props.data.name_ar} - ${props.data && props.data.code}`}
        </div>

        {/* Colors and Rating */}
        {/* Figma "content excluding price layout" gap: 3 suggests vertical spacing */}
        <div className="flex flex-col items-end space-y-1"> {/* Retained space-y-1 for internal elements */}
          {/* Rating - Moved above colors as per image */}
          <div className="flex items-center space-x-1">
            <div className="text-xs text-gray-600">(3.4k)</div>
            {/* Adjusted star size to be smaller */}
            <FaStar className="text-yellow-400 text-xs" />
            <FaStar className="text-yellow-400 text-xs" />
            <FaStar className="text-yellow-400 text-xs" />
            <FaStar className="text-yellow-400 text-xs" />
            <FaStar className="text-gray-300 text-xs" />
          </div>

          {/* Color Swatches */}
          <div className="flex items-center space-x-1">
            {colors &&
              colors.map((color) => (
                <div key={color.id}>
                  <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar}>
                    {/* Adjusted color swatch size to be smaller */}
                    <div
                      style={{ backgroundColor: color.colorCode }}
                      className="h-[14px] w-[14px] lg:h-[16px] lg:w-[16px] rounded-full border border-gray-200"
                    ></div>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>

        {/* Pricing */}
        {/* Figma "price and discount layout" dimensions: width: 238.25; height: 64; gap: 4px; */}
        {/* We'll use mt-auto to push it down and apply a gap */}
        <div className="flex flex-col items-end mt-auto pt-1 gap-1"> {/* Added pt-1 for top padding and gap-1 */}
          <div className="text-lg font-bold text-gray-900 flex items-baseline">
            <div className="ml-1">{CURRENCY}</div>
            <div>{props.data.varients[0].price}</div>
          </div>
          {props.data.varients[0].old_price > 0 &&
            props.data.varients[0].old_price > props.data.varients[0].price && (
              <div className="text-sm text-gray-500 line-through flex items-baseline">
                <div className="ml-1">{CURRENCY}</div>
                <div>{props.data.varients[0].old_price}</div>
              </div>
            )}
        </div>
      </div>

      {/* Discount Tag - Adjusted positioning to match image */}
      {props.data.varients[0].old_price > 0 && props.data.varients[0].old_price > props.data.varients[0].price && (
        <span className="absolute bottom-2 left-2 bg-[#FEE2E2] text-[#EF4444] text-xs font-bold px-2 py-0.5 rounded-full z-10">
          {`%${Math.round(((props.data.varients[0].old_price - props.data.varients[0].price) / props.data.varients[0].old_price) * 100)} خصم`}
        </span>
      )}
    </motion.div>
  )
}