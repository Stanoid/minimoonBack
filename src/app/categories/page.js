'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

  const getQueryVariable = (variable) => {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  };

  const getCatProducts = () => {
    fetch(`${API_URL}products?func=getProductswithCatid&cid=${getQueryVariable('cid')}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLod(false);
      });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetch(
      `${API_URL}products?func=filterProducts&cid=${getQueryVariable('cid')}&sizes=${newFilters.sizes}&colors=${newFilters.colors}&priceRange=${newFilters.priceRange}`
    )
      .then((res) => res.json())
      .then((data) => {
        // expect Strapi to return a flat array (no categories)
        setProducts([{ name_ar: 'النتائج', id: 0, products: data }]);
      });
  };

  useEffect(() => {
    getCatProducts();
  }, []);

  return (
    <>
      {/* Loading */}
      <div
        className="flex justify-center items-center"
        style={{ display: lod ? 'flex' : 'none', height: '100vh' }}
      >
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex w-full max-w-screen-xl mx-auto px-2 lg:px-4"
        style={{ display: lod ? 'none' : 'flex' }}
      >
        <div className="flex-1 space-y-2" dir="ltr">
          {/* Subcategories */}
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
                      src="https://res.cloudinary.com/strapimedia/image/upload/v1728387477/minimoon_assets/g2lsfkim9mi7dwc1ofxs.jpg"
                      alt="Product"
                    />
                  </div>
                  <div className="py-2 w-28 sm:w-28 lg:w-40 flex items-center justify-center text-sm">
                    {prd.name_ar}
                  </div>
                </div>
              ))}
          </div>

          {/* Products Grouped by Subcategory */}
          <div className="flex mt-8 flex-col justify-center items-center w-full">
            {Array.isArray(products) &&
              products.map((sub, index) => (
                <div className="w-full" key={sub.id}>
                  <div className="my-2 px-2 text-right text-moon-300 font-bold text-xl">
                    : {sub.name_ar}
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

        {/* Sidebar Filters */}
        <div className="w-64 shrink-0 p-4 bg-white border-l border-gray-200 hidden lg:block">
          <SidebarFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
    </>
  );
}
