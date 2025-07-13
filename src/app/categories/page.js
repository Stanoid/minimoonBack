'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { API_URL } from '../local';
import ProductCopm from '../comps/product';
import HorDiv from '../comps/hordiv';
import SidebarFilter from '../comps/prodfilter';

const Slider = dynamic(() => import('../comps/mainSlider'));

export default function Home() {
  const [lod, setLod] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
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
    fetch(
      `${API_URL}products?func=filterProducts&cid=${cid}&sizes=${newFilters.sizes}&colors=${newFilters.colors}&priceRange=${newFilters.priceRange}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts([{ name_ar: 'النتائج', id: 0, products: data }]);
      });
  };

  useEffect(() => {
    getCatProducts();
  }, [cid]); 
  return (
    <>
      <div
        className="flex justify-center  items-center"
        style={{ display: lod ? 'flex' : 'none', height: '100vh' }}
      >
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div
        className="flex w-full max-w-screen-xl mx-auto px-2 lg:px-4"
        style={{ display: lod ? 'none' : 'flex' }}
      >
        <div className="flex-1 space-y-2" dir="ltr">
          <div className="w-full py-2 mt-12 overflow-x-hidden flex items-center justify-center">
            {products &&
              products.products &&
              products.products.map((prd) => (
                <div
                  key={prd.id}
                  onClick={() => router.push(`/subcatagories?sid=${prd.id}`)}
                  className="shadow-md min-w-28 w-28 lg:w-40 lg:min-w-40 mx-1.5 sm:mx-1.5 lg:m-2 rounded-sm hover:scale-105 hover:shadow-medium cursor-pointer transition-all"
                >
                  <div className="w-28 h-28 lg:w-40 lg:h-40 relative">
                    <Image
                      quality={20}
                      objectFit="cover"
                      className="rounded-md rounded-b-none"
                      fill
               src={`${IMG_URL}${products.data?.images[0]?.formats?.medium?.url}`} 
                      alt="Product"
                    />
                  </div>
                  <div className="py-2 w-28 sm:w-28 lg:w-40 flex items-center justify-center text-sm">
                    {/* {prd.name_ar} */}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex mt-8 flex-col justify-center items-center w-full">
            {Array.isArray(products) &&
              products.map((sub, index) => (
                <div className="w-full" key={sub.id}>
                  <div className="my-2 px-2 text-right text-moon-300 font-bold text-xl">
                    {sub.name_ar}
                  </div>

                  {index % 2 === 0 ? (
                    <div className="px-0 sm:px-0 lg:px-2 grid w-full gap-y-4 my-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-4 grid-cols-2">
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

        <div className="lg:w-6[308px] shrink-0 p-4 hidden lg:block">
          <SidebarFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </>
  );
}
