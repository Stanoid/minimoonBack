'use client'

import Product from "../comps/product";
import dynamic from "next/dynamic";
import { API_URL } from "../local";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCopm from "../comps/product";
import Image from "next/image";
import HorDiv from "../comps/hordiv";

const Slider = dynamic(() => import("../comps/mainSlider"));

export default function Home() {
  const [lod, setLod] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  const getCatProducts = () => {
    fetch(`${API_URL}products?func=getProductswithCatid&cid=${getQueryVariable("cid")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("cat products", data);
        setProducts(data);
        setLod(false);
      });
  };

  useEffect(() => {
    getCatProducts();
  }, []);

  return (
    <>
      {/* Loading */}
      <div
        className=""
        style={{
          display: lod ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            zIndex: 10,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Main + Sidebar */}
      <div
        className="flex w-full max-w-screen-xl mx-auto  px-2 lg:px-4"
        style={{ display: lod ? "none" : "flex" }}
      >
        {/* Main Content */}
        <div className="flex-1 space-y-2" dir="ltr">
          <div className="w-full py-2 mt-12 overflow-x-hidden flex items-center justify-center">
            {products &&
              products.products &&
              products.products.map((prd) => (
                <div
                  onClick={() => {
                    router.push(`/subcatagories?sid=${prd.id}`);
                  }}
                  className="shadow-md min-w-28 w-28 lg:w-40 lg:min-w-40 mx-1.5 sm:mx-1.5 lg:m-2 rounded-sm hover:scale-105 hover:shadow-medium cursor-pointer transition-all"
                >
                  <div className="w-28 h-28 lg:w-40 lg:h-40 relative">
                    <Image
                      quality={20}
                      objectFit="cover"
                      className="rounded-md rounded-b-none"
                      fill
                      src="https://res.cloudinary.com/strapimedia/image/upload/v1728387477/minimoon_assets/g2lsfkim9mi7dwc1ofxs.jpg"
                      alt="Product"
                    />
                  </div>
                  <div className="py-2 w-28 sm:w-28 lg:w-40 flex items-center rounded-b-md justify-center text-sm">
                    {prd.name_ar}
                  </div>
                </div>
              ))}
          </div>

          {/* Sub Categories */}
          <div className="flex mt-8 flex-col justify-center items-center" style={{ width: "100%" }}>
            {Array.isArray(products) &&
              products.map((sub, index) => (
                <div className="w-full px-0 sm:px-0" key={sub.id}>
                  <div className="my-2 px-2 text-right text-moon-300 font-bold text-xl">
                    : {sub.name_ar}
                  </div>

                  {index % 2 === 0 ? (
                    <div
                      className="px-0 sm:px-0 lg:px-2 grid w-full gap-y-4 my-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-4 grid-cols-2"
                    >
                      {sub.products &&
                        sub.products.map(
                          (prd) =>
                            prd.status && (
                              <div key={prd.id}>
                                <ProductCopm atcbtn={false} data={prd} />
                              </div>
                            )
                        )}
                    </div>
                  ) : (
                    <div className="w-full">
                      <HorDiv cid={sub.id} data={sub.products} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Sidebar (on right) */}
        <aside className="w-64 shrink-0 p-4 border-l border-gray-200 bg-white hidden lg:block" dir="rtl">
          <h3 className="text-lg font-bold mb-4 text-right text-gray-800">الفلاتر</h3>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">الألوان</h4>
            <div className="flex flex-wrap gap-2">
              {["أحمر", "أزرق", "أخضر"].map((color, index) => (
                <button key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-pink-200">
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">المقاسات</h4>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((size, index) => (
                <button key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-pink-200">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">السعر</h4>
            <input type="range" min="0" max="10000" step="100" className="w-full" />
            <div className="text-sm text-gray-600 mt-1 text-right">حتى 10,000</div>
          </div>
        </aside>
      </div>
    </>
  );
}
