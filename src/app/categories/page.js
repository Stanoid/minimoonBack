'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { API_URL, IMG_URL } from '../local';
import ProductCopm from '../comps/product';
import HorDiv from '../comps/hordiv';
import SidebarFilter from '../comps/prodfilter';

const Slider = dynamic(() => import('../comps/mainSlider'));

export default function Home() {
  const [lod, setLod] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState(null);
  const [filters, setFilters] = useState({});
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');

  const getCatProducts = () => {
    if (!cid) return;

    fetch(`${API_URL}products?func=getProductswithCatid&cid=${cid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Products fetched from server:", data);
        setProducts(data);
        setLod(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setLod(false);
      });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowMobileFilter(false); 
    fetch(
      `${API_URL}products?func=filterProducts&cid=${cid}&sizes=${newFilters.sizes}&colors=${newFilters.colors}&priceRange=${newFilters.priceRange}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredResults({ name_ar: 'النتائج', id: 0, products: data });
      });
  };

  useEffect(() => {
    getCatProducts();
  }, [cid]);

  return (
    <>
      {lod && (
        <div className="flex justify-center items-center h-screen">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {!lod && (
        <div className="flex w-full max-w-screen-xl mx-auto px-2">
          {/* Main Content */}
          <div className="flex-1 space-y-2" dir="ltr">
            {/* Subcategory Banners */}
            <div className="w-full py-2 mt-12  grid grid-cols-3 gap-4  items-center justify-center">
              {products?.products?.map((prd) => (
                <div
                  key={prd.id}
                  onClick={() => router.push(`/subcatagories?sid=${prd.id}`)}
                  className="shadow-md min-w-28 w-28 lg:w-40 lg:min-w-40 mx-1.5 rounded-sm hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="w-28 h-28 lg:w-40 lg:h-40 relative">
                    <Image
                      quality={20}
                      fill
                      objectFit="cover"
                      className="rounded-md rounded-b-none"
                      src={`${IMG_URL}${products.data?.images?.[0]?.formats?.medium?.url}`}
                      alt="Product"
                    />
                  </div>
                  <div className="py-2 w-full text-sm text-center">{/* {prd.name_ar} */}</div>
                </div>
              ))}
            </div>

            {filteredResults && (
              <div className="w-full">
                <div className="my-2 px-2 text-right text-moon-300 font-bold text-xl">
                  {filteredResults.name_ar}
                </div>

                <div className="px-2 grid gap-y-4 my-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-4 grid-cols-2">
                  {filteredResults.products.map(
                    (prd) =>
                      prd.status && (
                        <div key={prd.id}>
                          <ProductCopm atcbtn={false} data={prd} />
                        </div>
                      )
                  )}
                </div>

                <div className="w-full text-right px-2 mb-4">
                  <button
                    onClick={() => setFilteredResults(null)}
                    className="text-sm text-blue-600 underline"
                  >
                    عرض كل المنتجات
                  </button>
                </div>
              </div>
            )}

            {Array.isArray(products) &&
              products.map((sub, index) => (
                <div className="w-full" key={sub.id}>
                  <div className="my-2 px-2 text-right text-moon-300 font-bold text-xl">
                    {sub.name_ar}
                  </div>

                  {index % 2 === 0 ? (
                    <div className="px-0 grid w-full gap-y-4 my-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-4 grid-cols-2">
                      {sub.products?.map(
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

          <div className="hidden lg:block lg:w-[250px] shrink-0 p-4">
            <SidebarFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}


      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="px-4 py-2 bg-moon-200 text-white rounded-md shadow-md"
        >
          فلترة المنتجات
        </button>
      </div>

      {showMobileFilter && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">فلترة المنتجات</h2>
            <button
              className="text-sm text-red-500"
              onClick={() => setShowMobileFilter(false)}
            >
              إغلاق
            </button>
          </div>

          <SidebarFilter onFilterChange={handleFilterChange} />
        </div>
      )}
    </>
  );
}
