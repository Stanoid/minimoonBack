'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaArrowUp, FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { IMG_URL, Theme } from '../local';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageZoom from 'react-image-zooom';


const GlobalStyles = createGlobalStyle`
  #root {
    position: relative;
    height: auto;
  }
`;

function Lens({ data = [] }) {
  const [zoomv, setZoomv] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
  const isZoomingRef = useRef(false);

  const [modalZoomLevel, setModalZoomLevel] = useState(1);
  const [modalTransformOrigin, setModalTransformOrigin] = useState('center center');

  const modalImageRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const firstUrl = data[0]?.attributes?.url;
      if (firstUrl) setGalleryImage(IMG_URL + firstUrl);
    }
  }, [data]);

  const handleClick = (url) => {
    if (url) setGalleryImage(IMG_URL + url);
  };

  const openModalWithIndex = (index) => {
    setCurrentModalImageIndex(index);
    setIsModalOpen(true);
    setModalZoomLevel(1); 
    setModalTransformOrigin('center center'); 
  };

  const handleMainImageTouchEnd = () => {
    setZoomv(false);
    if (!isZoomingRef.current) {
      const index = data.findIndex(img => IMG_URL + img.attributes?.url === galleryImage);
      openModalWithIndex(index !== -1 ? index : 0);
    } else {
      isZoomingRef.current = false;
    }
  };

  const handleModalImageClick = (e) => {
    if (modalZoomLevel === 1) {
      // Zoom in
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      setModalTransformOrigin(`${x}% ${y}%`);
    } else {
      setModalZoomLevel(1);
      setModalTransformOrigin('center center');
    }
  };

  const handleModalMouseMove = (e) => {
    if (modalZoomLevel > 1) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      setModalTransformOrigin(`${x}% ${y}%`);
    }
  };

  return (
    <div dir="rtl" id="root">
      <GlobalStyles />

      <div className="w-full flex flex-col-reverse lg:flex-row">
        <div className="flex lg:hidden flex-row gap-2 overflow-x-auto pb-2">
          {data.map((img, i) => (
            <div key={i} className="relative w-16 h-16 cursor-pointer">
              <Image
                src={IMG_URL + img.attributes?.url}
                alt={`thumb-${i}`}
                fill
                style={{ objectFit: 'cover' }}
                onClick={() => handleClick(img.attributes?.url)}
                className="rounded-md shadow-sm"
              />
            </div>
          ))}
        </div>

        <div
          id="bb"
          onMouseDown={() => { setZoomv(true); isZoomingRef.current = true; }}
          onMouseUp={() => { setZoomv(false); isZoomingRef.current = false; }}
          onMouseLeave={() => { setZoomv(false); isZoomingRef.current = false; }}
          onTouchStart={(e) => { e.preventDefault(); setZoomv(true); isZoomingRef.current = true; }}
          onTouchEnd={handleMainImageTouchEnd}
          onClick={() => {
            if (!zoomv && !isZoomingRef.current) {
              const index = data.findIndex(img => IMG_URL + img.attributes?.url === galleryImage);
              openModalWithIndex(index !== -1 ? index : 0);
            }
          }}
          style={{ backgroundColor: zoomv ? Theme.primary : '', WebkitUserSelect: 'none', zIndex: zoomv ? 30 : 0 }}
          className="relative transition-all duration-75 rounded-md mb-4 p-2 w-[343px] h-[326px] lg:w-[528px] lg:h-[606px] mx-auto"
        >
          {galleryImage && (
            <img
              src={galleryImage}
              alt="Zoomable"
              className="w-full h-full object-cover rounded-md"
            />
          )}

          <div className="absolute bottom-2 w-full left-0 px-2 flex justify-center items-center text-xs text-white">
            <motion.div>
              <FaArrowUp className="mr-1 animate-bounce" />
            </motion.div>
            إضغط و اسحب على الصورة للتكبير (Click for full screen)
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-2 pr-2">
          {data.map((img, i) => (
            <div key={i} className="relative w-16 h-16 cursor-pointer">
              <Image
                src={IMG_URL + img.attributes?.url}
                alt={`thumb-lg-${i}`}
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handleClick(img.attributes?.url)}
                className="rounded-md shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 p-2 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl   h-screen p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-2 bg-white border border-gray-900 text-xs px-2 py-1 rounded-md flex items-center z-20 hover:bg-gray-100"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5" />
              </svg>
              اغلاق
            </button>

            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-lg">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-l from-moon-100 to-white text-white hover:text-moon-200 rounded-full text-2xl z-10" // Add z-index to buttons
                onClick={() => {
                  setCurrentModalImageIndex(i => (i === 0 ? data.length - 1 : i - 1));
                  setModalZoomLevel(1); 
                  setModalTransformOrigin('center center'); 
                }}
              >
                <FaAngleLeft />
              </button>
              <div
                className="relative w-full flex items-center justify-center h-full overflow-hidden" 
                onClick={handleModalImageClick}
                onMouseMove={handleModalMouseMove}
                ref={modalImageRef}
                style={{ cursor: modalZoomLevel === 2 ? 'zoom-in' : 'zoom-out' }}
              >
                <ImageZoom
                  src={IMG_URL + data[currentModalImageIndex].attributes?.url}
                  alt={`modal-${currentModalImageIndex}`}
                  fill
                  style={{
                    objectFit: modalZoomLevel === 1 ? 'contain' : 'initial', 
                    transform: `scale(${modalZoomLevel})`,
                    transformOrigin: modalTransformOrigin,
                    transition: 'transform 0.1s ease-out', 
                    pointerEvents: modalZoomLevel > 1 ? 'auto' : 'none', 
                  }}
                  className="rounded-md max-w-[400px] "
                />
              </div>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-moon-100 to-white text-white hover:text-moon-200 rounded-full text-2xl z-10" // Add z-index to buttons
                onClick={() => {
                  setCurrentModalImageIndex(i => (i === data.length - 1 ? 0 : i + 1));
                  setModalZoomLevel(1); // Reset zoom on image change
                  setModalTransformOrigin('center center'); // Reset origin
                }}
              >
                <FaAngleRight />
              </button>
            </div>

            <div className="flex gap-2  mt-2">
              {data.map((img, i) => (
                <div
                  key={i}
                  className={`relative w-12 h-12 cursor-pointer border-2 ${i === currentModalImageIndex ? 'border-blue-500' : 'border-transparent'} rounded-md`}
                  onClick={() => {
                    setCurrentModalImageIndex(i);
                    setModalZoomLevel(1); // Reset zoom on thumbnail click
                    setModalTransformOrigin('center center'); // Reset origin
                  }}
                >
                  <Image
                    src={IMG_URL + img.attributes?.url}
                    alt={`thumb-modal-${i}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lens;