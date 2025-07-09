/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { removeFromCart } from "../lib/actions/counterAction";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import {
  BsChevronDown,
  BsChevronUp,
  BsDash,
  BsPlus,
  BsThermometer,
  BsTrashFill,
} from "react-icons/bs";
import FaHeartCircleMinus from "react-icons/fa6";
import { CURRENCY, IMG_URL, Theme } from "../local";

import { BsX } from "react-icons/bs";
import { color } from "framer-motion";

export default function Cartel(props) {
  const [open, setOpen] = useState(true);
  const [varient, setVarient] = useState(null);
  const [varients, setVarients] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setVarients(props.data.attributes.varients.data);
    // setVarient(props.data.attributes.varients.data[0]);
    
    for (let i = 0; i < props.data.attributes.varients.data.length; i++) {
      if(props.data.attributes.varients.data[i].id==props.selvar){
        setVarient(props.data.attributes.varients.data[i]);
      }
      
    }
    
    console.log("here daddy",props.data.attributes.varients.data)

  },[]);

  const removeid = () => {
    props.removeItem(props.index);
  };

  // console.log("attrubutes", props.data.attributes)
  // console.log("Image URL:", props.data.attributes.images?.data?.[0]?.attributes?.url);

  return (
    <div
      className=" w-full"
      style={{
        display: "flex",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "white",
        margin: "10px 10px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
<img
  className="w-[84px] h-[84px] object-cover lg:w-[120px] lg:h-[120px]"
  style={{ borderRadius: 8 }}
  src={
    props.data.attributes.images?.data?.[0]?.attributes?.url
      ? IMG_URL + props.data.attributes.images.data[0].attributes.url
      : "/default-image.png"
  }
/>

        </div>

        <div
          style={{
            display: "flex",
            // alignItems: "center",
            // justifyContent: "end",
            flexDirection: "column",
          }}
          className="sm:flex-col lg:flex-row"
        >
          {/* <div
            dir="rtl"
            className="text-xs w-full"
            style={{
              padding: 5,
              paddingBottom: 0,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {props.data.attributes.name_ar.length > 30
              ? props.data.attributes.name_ar.slice(0, 30) + "..."
              : props.data.attributes.name_ar}
              -           {props.code}

          </div> */}

          <div className="flex flex-col items-end flex-grow text-right pr-4"> 
  <div className="text-base font-semibold text-gray-800">
    <span className="block overflow-hidden whitespace-nowrap text-ellipsis" dir="rtl">
      {props.data.attributes.name_ar} - {props.code}
    </span>
  </div>
  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 mt-1" dir="rtl">
    
    {varient && varient.attributes.colors.data[0] && (
      <div
      className="w-4 h-4 rounded-full border border-gray-500 flex-shrink-0"
      style={{ backgroundColor: varient.attributes.colors.data[0].attributes.colorCode }}
      >

      </div>
    )}
 {varient && varient.attributes.colors.data[0] && (
      <span className="text-gray-600 text-sm font-medium">
        {varient.attributes.colors.data[0].attributes.name_ar} - 
      </span>
    )}


    {varient && varient.attributes.sizes.data[0] && (
      <span className="font-medium">{varient.attributes.sizes.data[0].attributes.icon}</span>
    )}
    {/* <span className="ml-1">الاحمر</span>  */}
  </div>
  <div className="flex items-center gap-2 space-x-1 rtl:space-x-reverse mt-2">
    <button
      onClick={() => handleQuantityChange('decrease')}
      className="w-6 h-6 border  border-moon-200  rounded-md flex items-center justify-center text-sm"
      style={{ color: Theme.primary, backgroundColor: 'white' }}
    >
      <BsDash className="w-4 h-4" />
    </button>
    <span className="text-base font-medium">{props.qty}</span>
    <button
      onClick={() => handleQuantityChange('increase')}
      className="w-6 h-6 rounded-md flex items-center justify-center text-sm"
      style={{ backgroundColor: Theme.primary, color: 'white' }}
    >
      <BsPlus className="w-4 h-4" />
    </button>
  </div>
</div>
        </div>


        {/* <div className="bg-moon-200 text-white px-2 py-1 text-sm rounded-full ">
          {props.code}
        </div> */}

          {/* <div
          className=""
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginLeft: 5,
            }}
          >
            <div
              className="space-x-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            
              {varient &&
                varient.attributes.colors.data.map((color) => {
                  if (color.id == props.color) {
                    return (
                      <div
                        style={{ backgroundColor: varient&&varient.attributes.colors.data[0].attributes.colorCode }}
                        className="w-7 h-7 rounded-full"
                      ></div>
                    );
                  }
                })} 

  <div
                        style={{ backgroundColor: varient&&varient.attributes.colors.data[0].attributes.colorCode }}
                        className="w-7 h-7 rounded-full"
                      ></div>

            </div>
          </div> */}

        <div
          onClick={() => {
            dispatch(removeFromCart(
             {id: props.selvar, color:props.color, size:props.size}
            ));
          }}
          style={{
            display: props.order ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "2px solid lightgrey",
            paddingRight: 10,
          }}
        >
          <div
          className="border border-moon-200 rounded-md  text-moon-200"
            style={{  padding: 2.5 }}
          >
            <BsX style={{ color: "", fontSize: 25 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
