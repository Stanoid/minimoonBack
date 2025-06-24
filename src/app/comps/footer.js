import React from 'react';
// import { 
//   PhoneIcon, 
//   EnvelopeIcon,
//   CreditCardIcon,
//   TruckIcon,
  
// } from '@heroicons/react/24/outline';
import { FaTwitter, FaFacebookF, FaInstagram, FaDribbble } from 'react-icons/fa';
// import { HiPhone, HiEnvelope, HiCreditCard, HiTruck } from "react-icons/hi";
import { FaPhone, FaEnvelope, FaCreditCard, FaTruck } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4">
      <div className="max-w6xl mx-auto">
        {/* Main Footer Content */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-center">
  {/* Contact Section */}
  <div className="text-center md:text-right" dir="rtl">
    <div className="flex justify-center md:justify-start items-center mb-4">
      <FaPhone className="w-8 h-8 text-gray-400 ml-3" />
      <h3 className="text-sm font-semibold text-gray-700">اتصل بنا</h3>
    </div>
    <div className="space-y-3">
      <div className="flex items-center justify-center md:justify-start">
        <span className="text-gray-600 ml-2">+1234567890</span>
        <FaPhone className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex items-center justify-center md:justify-start">
        <span className="text-gray-600 ml-2">Support@minimoon.com</span>
        <FaEnvelope className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </div>

  {/* Payment Methods Section */}
  <div className="text-center md:text-right" dir="rtl">
    <div className="flex justify-center md:justify-start items-center mb-4">
      <FaCreditCard className="w-8 h-8 text-gray-400 ml-3" />
      <h3 className="text-sm font-semibold text-gray-700">جميع وسائل الدفع الآمنة</h3>
    </div>
    <p className="text-gray-600 font-medium leading-relaxed">
      يمكنك الشراء باستخدام ايزا وطرق مختلفة للدفع منها الدفع عند الاستلام والإلكتروني وغيرها
    </p>
  </div>

  {/* Shipping Section */}
  <div className="text-center md:text-right" dir="rtl">
    <div className="flex justify-center md:justify-start items-center mb-4">
      <FaTruck className="w-8 h-8 text-gray-400 ml-3" />
      <h3 className="text-sm font-semibold text-gray-700">تتبع الطلب والشحن</h3>
    </div>
    <p className="text-gray-600 font-medium leading-relaxed">
      نتيح لك معرفة موعد وصول مشترياتك عبر الإنترنت بجودة في التسليم
    </p>
  </div>
</div>

        {/* Newsletter Section */}
        {/* <div className="bg-white rounded-lg p-8 mb-12 text-center" dir="rtl">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            احصل على أحدث العروض على بريدك
          </h3>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="قم بإدخال البريد الإلكتروني"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors">
              اشترك الآن
            </button>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right" dir="rtl">
          
          {/* Orders & Shipping */}
          <div>
            <h4 className="font-semibold text-gray-700 text-sm mb-4">الطلبات والشحن</h4>
            <ul className="space-y-2 text-gray-600 text-base">
              <li><a href="#" className="hover:text-gray-800">حسابي</a></li>
              <li><a href="#" className="hover:text-gray-800">تتبع الطلب</a></li>
              <li><a href="#" className="hover:text-gray-800">سياسة الشحن و الإرجاع</a></li>
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-4">عن الشركة</h4>
            <ul className="space-y-2 text-gray-500 text-base">
              <li><a href="#" className="hover:text-gray-800">الوظائف</a></li>
              <li><a href="#" className="hover:text-gray-800">من نحن</a></li>
              <li><a href="#" className="hover:text-gray-800">متاجرنا</a></li>
            </ul>
          </div>

          {/* Social Media */}

          <div className=" rounded-lg p-8 mb-12 " dir="rtl">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            احصل على أحدث العروض على بريدك
          </h3>
          <div className="max-w-md mx-auto flex flex-col gap-2">
          <input
  type="email"
  placeholder="قم بإدخال البريد الإلكتروني"
  className="w-[395px] h-[42px] px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-red-400"
/>

           <button className="w-[395px] h-[41px] px-5 py-2.5 bg-red-400 text-white rounded-lg border hover:bg-red-500 transition-colors">
  اشترك الآن
</button>

          </div>
        </div>
     
        </div>


<div className='  flex w-xl py-5 justify-center items center'>




<div className="flex space-x-4">
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaTwitter className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaFacebookF className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaInstagram className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-gray-600">
        <FaDribbble className="w-6 h-6" />
      </a>
    </div>


</div>
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center mb-4 md:mb-0">
            <span>جميع الحقوق محفوظة © مني مون 2024</span>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="hover:text-gray-700">ملفات التعريف</a>
            <a href="#" className="hover:text-gray-700">الخصوصية والأمان</a>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="font-semibold">mini moon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;