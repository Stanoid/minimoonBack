import React from 'react';

const Footer = () => {
  return (
    // Main footer container with specified width and background color
    <footer dir='rtl' className="bg-white border-t border-gray-505 py-16 px-4 w-[1440px] mx-auto" style={{ height: '644px' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Contact, Payment, Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start text-right" dir="rtl">
          {/* Shipping Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-4">
              {/* Truck Icon (Replaced FaTruck with SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697A3.42 3.42 0 007 9.111v3.316l-2.709 1.355A3.42 3.42 0 002 16.035V18l.835 1.697A3.42 3.42 0 006.165 22h11.67A3.42 3.42 0 0021 19.697V18l.835-1.697A3.42 3.42 0 0022 13.965v-3.316a3.42 3.42 0 00-.835-2.614L18 4.697z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-700">تتبع الطلب والشحن</h3>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed text-center md:text-right">
              نتيح لك معرفة موعد وصول مشترياتك عبر الإنترنت بجودة في التسليم
            </p>
          </div>

          {/* Payment Methods Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-4">
              {/* Credit Card Icon (Replaced FaCreditCard with SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-700">جميع وسائل الدفع الآمنة</h3>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed text-center md:text-right">
              يمكنك الشراء باستخدام ايزا وطرق مختلفة للدفع منها الدفع عند الاستلام والإلكتروني وغيرها
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-4">
              {/* Phone Icon (Replaced FaPhone with SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-700">اتصل بنا</h3>
            </div>
            <div className="space-y-3 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end">
                <span className="text-gray-600 ml-2">+1234567890</span>
                {/* Phone Icon (Replaced FaPhone with SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <span className="text-gray-600 ml-2">Support@minimoon.com</span>
                {/* Envelope Icon (Replaced FaEnvelope with SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-200 my-12"></div>

        {/* Middle Section - Orders, About, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right" dir="rtl">
          {/* Newsletter Section */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              احصل على أحدث العروض على بريدك
            </h3>
            <div className="max-w-md w-full flex flex-col gap-2 items-center md:items-end">
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

          {/* About Company */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold text-sm text-gray-700 mb-4">عن الشركة</h4>
            <ul className="space-y-2 text-gray-600 text-base">
              <li><a href="#" className="hover:text-gray-800">الوظائف</a></li>
              <li><a href="#" className="hover:text-gray-800">من نحن</a></li>
              <li><a href="#" className="hover:text-gray-800">متاجرنا</a></li>
            </ul>
          </div>
          
          {/* Orders & Shipping */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold text-gray-700 text-sm mb-4">الطلبات والشحن</h4>
            <ul className="space-y-2 text-gray-600 text-base">
              <li><a href="#" className="hover:text-gray-800">حسابي</a></li>
              <li><a href="#" className="hover:text-gray-800">تتبع الطلب</a></li>
              <li><a href="#" className="hover:text-gray-800">سياسة الشحن و الإرجاع</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center py-5">
          <div className="flex space-x-4">
            {/* Twitter Icon (Replaced FaTwitter with SVG) */}
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.256 5.676c-.66.293-1.37.49-2.108.577.76-.456 1.34-1.18 1.615-2.04-.71.424-1.5.73-2.336.898-.67-.714-1.62-1.16-2.67-1.16-2.02 0-3.66 1.64-3.66 3.66 0 .287.032.56.096.825-3.04-.153-5.743-1.6-7.55-3.837-.315.54-.495 1.17-.495 1.84 0 1.27.645 2.39 1.628 3.058-.598-.018-1.16-.184-1.65-.453v.045c0 1.77 1.258 3.247 2.923 3.582-.305.083-.627.126-.96.126-.235 0-.46-.023-.68-.067.465 1.45 1.815 2.505 3.425 2.535-1.24.97-2.79 1.55-4.47 1.55-.29 0-.58-.017-.86-.05 1.61 1.04 3.52 1.65 5.56 1.65 6.67 0 10.31-5.52 10.31-10.31 0-.158-.003-.315-.01-.47.715-.51 1.335-1.14 1.83-1.87z" />
              </svg>
            </a>
            {/* Facebook Icon (Replaced FaFacebookF with SVG) */}
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0H5c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-3 7h-2v2h2v-2zm0 3h-2v2h2v-2zm0 3h-2v2h2v-2zm-3 0h-2v2h2v-2zm0-3h-2v2h2v-2zm0-3h-2v2h2v-2zm-3 6H8v2h2v-2zm0-3H8v2h2v-2zm0-3H8v2h2v-2zM5 22V5c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v12h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2H5zm14-10h-2v2h2v-2zm0 3h-2v2h2v-2z" />
                <path d="M15 8h-2c-1.104 0-2 .896-2 2v2h4l-1 3h-3v7h-3v-7h-3V10h3V7c0-3.867 2.67-6 6-6h2v4h-2c-.552 0-1 .448-1 1v1z" />
              </svg>
            </a>
            {/* Instagram Icon (Replaced FaInstagram with SVG) */}
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.06 1.805.234 2.224.413.56.243.96.65 1.353 1.042.393.393.801.794 1.043 1.352.179.419.353 1.054.413 2.224.058 1.265.07 1.646.07 4.85s-.012 3.584-.071 4.85c-.06 1.17-.234 1.805-.413 2.224-.243.56-.65 1.003-1.042 1.353-.393.393-.794.801-1.352 1.043-.419.179-1.054.353-2.224.413-1.265.058-1.646.07-4.85.07s-3.584-.012-4.85-.071c-1.17-.06-1.805-.234-2.224-.413-.56-.243-.96-.65-1.353-1.042-.393-.393-.801-.794-1.043-1.352-.179-.419-.353-1.054-.413-2.224-.058-1.265-.07-1.646-.07-4.85s.012-3.584.071-4.85c.06-1.17.234-1.805.413-2.224.243-.56.65-1.003 1.042-1.353.393-.393.794-.801 1.352-1.043.419-.179 1.054-.353 2.224-.413C8.416 2.175 8.797 2.163 12 2.163zm0 1.488c-3.195 0-3.565.012-4.82.07c-1.085.056-1.57.214-1.84.32-.38.153-.64.357-.92.64-.28.28-.487.54-.64.92-.106.27-.264.755-.32 1.84-.058 1.255-.07 1.625-.07 4.82s.012 3.565.07 4.82c.056 1.085.214 1.57.32 1.84.153.38.357.64.64.92.28.28.54.487.92.64.27.106.755.264 1.84.32 1.255.058 1.625.07 4.82.07s3.565-.012 4.82-.07c1.085-.056 1.57-.214 1.84-.32.38-.153.64-.357.92-.64.28-.28.487-.54.64-.92.106-.27.264-.755.32-1.84.058-1.255.07-1.625.07-4.82s-.012-3.565-.07-4.82c-.056-1.085-.214-1.57-.32-1.84-.153-.38-.357-.64-.92-.64-.28-.28-.54-.487-.64-.92-.106-.27-.264-.755-.32-1.84-.058-1.255-.07-1.625-.07-4.82zM12 7.75c2.347 0 4.25 1.903 4.25 4.25S14.347 16.25 12 16.25 7.75 14.347 7.75 12 9.653 7.75 12 7.75zm0 1.488c-1.527 0-2.762 1.235-2.762 2.762s1.235 2.762 2.762 2.762 2.762-1.235 2.762-2.762S13.527 9.238 12 9.238zM17.857 5.093c0 .548-.445.992-.993.992s-.992-.444-.992-.992.445-.992.993-.992.992.444.992.992z" />
              </svg>
            </a>
            {/* Dribbble Icon (Replaced FaDribbble with SVG) */}
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8 10c0 .99-.14 1.94-.41 2.83l-4.59-4.59c.78-.54 1.34-1.24 1.63-2.01l3.37 3.37c-.07.07-.15.13-.24.19zM4 12c0-.99.14-1.94.41-2.83l4.59 4.59c-.78.54-1.34 1.24-1.63 2.01L4 12zm10-1.85V10c0 1.38-1.12 2.5-2.5 2.5h-.7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.7c.83 0 1.5.67 1.5 1.5zm0-2.35v-1.5c0-.83-.67-1.5-1.5-1.5h-.7c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h.7c.83 0 1.5.67 1.5 1.5zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center mb-4 md:mb-0 order-3 md:order-1">
            <span className="font-semibold">mini moon</span>
          </div>
          <div className="flex space-x-6 space-x-reverse order-2 md:order-2">
            <a href="#" className="hover:text-gray-700">ملفات التعريف</a>
            <a href="#" className="hover:text-gray-700">الخصوصية والأمان</a>
          </div>
          <div className="mt-4 md:mt-0 order-1 md:order-3">
            <span>جميع الحقوق محفوظة © مني مون 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
