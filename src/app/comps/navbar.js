import React, { useState, useEffect } from "react";
// Removed Navbar, NavbarBrand, Avatar, and NavbarContent from imports as they are not used
import { Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Tooltip, Badge } from "@nextui-org/react";
import { MdMenu, MdOutlineShoppingBag, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaHeart, FaUserCircle, FaSearch, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";

import Logowhite from "../../../public/logoblack.svg";

export default function NavbarC(props) {
  const router = useRouter();
  const userData = useSelector((state) => state.root.auth.data && state.root.auth.data);
  const cartData = useSelector((state) => state.root.cart.data.length);

  useEffect(() => {
    // loginval(); // Uncomment if needed based on your application's requirements
  }, []);

  const handleSearch = () => {
    props.setSearchTog(!props.searchTog);
  };

  const handleAccount = (type) => {
    switch (type) {
      case 1:
        router.push("/admin");
        break;
      case 4:
        router.push("/user");
        break;
      case 5:
        router.push("/delivery");
        break;
      default:
        router.push("/");
        break;
    }
  };

  const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <nav className="bg-white shadow-sm font-sans w-full">
      {/* Top Alert/Offer Banner */}
      <div className="bg-red-100 text-red-700 text-sm py-2 flex items-center justify-center rtl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold">لا تفوت عرض رأس العام! ارتق بمجموعتك الآن.</span>
        <span className="mr-1">خصم يصل الي 50%</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>

      {/* Top Utility Bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-gray-500 text-sm border-b border-gray-200 rtl">
        <div className="flex items-center space-x-4 space-x-reverse">
          <a href="#" className="flex items-center space-x-1 space-x-reverse hover:text-gray-900">
             {/* Using generic SVGs for exact match of image's icons if react-icons don't match perfectly */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>اتصل بنا</span>
          </a>
          <a href="#" className="flex items-center space-x-1 space-x-reverse hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>من نحن</span>
          </a>
          <div className="flex items-center space-x-3 text-gray-500">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900"><FaFacebook className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900"><FaInstagram className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900"><FaTwitter className="w-4 h-4" /></a>
          </div>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
         
          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer hover:text-gray-900">
             {/* Using generic SVG for exact match of image's pricing icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.727A8 8 0 0118 8a8 8 0 00-8-8c-4.418 0-8 3.582-8 8s3.582 8 8 8c.707 0 1.397-.091 2.062-.257M10 20v-3m0 0l-2.5-2.5M10 17l2.5-2.5M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">افضل الاسعار</span> {/* Explicitly small text */}
            <MdOutlineKeyboardArrowDown className="h-3 w-3" />
          </div>


          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer hover:text-gray-900">

            <span className="text-sm">اسرع توصيل</span> {/* Explicitly small text */}
            <MdOutlineKeyboardArrowDown className="h-3 w-3" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex justify-between items-center rtl">

    

        <div className="flex items-center order-3"> {/* order-3 pushes it further right visually in RTL */}
        
        
          <div
          dir="rtl"
  className="relative flex items-center flex-grow-0
             w-[776px] h-[46px]
             px-[1.5px] py-[1.5px]
             rounded-[8px] border border-gray-300 bg-gray-100
             focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500
             overflow-hidden"
>
  <input
    type="text"
    placeholder="واش راكي تدوّري عليه؟"
    className="flex-grow h-full py-2
               pr-[80px] pl-4
               bg-transparent outline-none
               text-right text-sm"
  />

  <button
   
    className="absolute top-[1.5px] bottom-[1.5px] right-[1.5px]
               bg-[#eb5757] text-white font-medium
               w-[70px]
               flex items-center justify-center
               rounded-r-[7px]
               z-10"
    type="submit"
    aria-label="بحث"
  >
    بحث
  </button>
</div>


<Logowhite style={{ cursor: "pointer", width: "64px", height:"26.694103240966797px" }} onClick={() => { router.push("/"); }} width={100} />



        </div>
        
        <div className="flex items-center space-x-6 space-x-reverse order-1"> 
        
        

     


          {userData && !userData.error ? (
            <motion.div
              className="flex items-center space-x-1 space-x-reverse text-gray-700 hover:text-gray-900 cursor-pointer"
              >
              <span className="text-sm">حسابي</span> {/* Added text label */}
              <Button onClick={() => { handleAccount(userData.data.user.type); }} isIconOnly className=" text-2xl font-black text-gray-600 rounded-full" size="md" aria-label="Account">
                <FaUserCircle />
              </Button>
            </motion.div>
          ) : (
            <motion.div
            >
                <Button onClick={() => { router.push("/login"); }} className="bg-gradient-to-tr from-moonsec-100/40 to-moonsec-100 text-xs font-medium text-white px-3 py-1 rounded-md" size="sm" aria-label="Login">
                  تسجيل دخول
                </Button>
            </motion.div>
          )}


          <motion.div

            className="flex items-center space-x-1 space-x-reverse text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <Badge size="md" content={cartData} placement="top-left" showOutline={false} variant="flat" color="primary" className="flex bg-moon-200 text-white align-middle justify-center">
            <span className="ml-2 text-sm">3 منتجات 106.25 $</span> 
                <Button onClick={() => { props.openCart(true); }} isIconOnly className="" size="md" aria-label="Cart">
                  <MdOutlineShoppingBag />
                </Button>
            </Badge>
          </motion.div>


          {userData && !userData.error ? (
            <motion.div
              className="flex items-center space-x-1 space-x-reverse text-gray-700 hover:text-gray-900 cursor-pointer relative"
            >
              <span className="text-sm mr-2">المفضلة</span> 
              <Button onClick={() => { props.openFav(true); }} isIconOnly className=" text-xl text-blie-600 border border-gray-700 rounded-full" size="md" aria-label="Favorites">
                <FaHeart />
              </Button>
              <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">4</span>
            </motion.div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 border-t border-gray-200 rtl hidden lg:block"> 
        <ul className="flex justify-between items-center text-gray-700 text-sm font-medium">
          <li><a href="/categories" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">كل التصنيفات</a></li>
          <li><a href="/categories?tag=pajama-5-piece" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">بجامة 5 قطع</a></li>
          <li><a href="/categories?tag=2-piece" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">2 قطعة</a></li>
          <li><a href="/categories?tag=mobile" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">جوال</a></li>
          <li><a href="/categories?tag=bathrobe" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">روب حمام</a></li>
          <li><a href="/categories?tag=underwear" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">ملابس داخلية</a></li>
          <li><a href="/categories?tag=plus-size" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">حجم كبير</a></li>
          <li><a href="/categories?tag=bath-set" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">طقم حمام</a></li>
          <li><a href="/categories?tag=another-pajama-5-piece" className="px-4 py-2 hover:text-red-500 whitespace-nowrap">بجامة 5 قطع</a></li>
        </ul>
      </div>
    </nav>
  );
}