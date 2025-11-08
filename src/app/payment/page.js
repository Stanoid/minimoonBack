'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import { FaCheckCircle, FaListAlt, FaShoppingBasket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { clearCart } from '../lib/actions/counterAction';

function AccounteEl() {
  const router = useRouter();
  const dispatch = useDispatch();
  const firstRenderRef = useRef(true);
  const [lod, setLod] = useState(false);

  const isLogged = useSelector((state) => state.root.auth.data && state.root.auth.data);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      orderhandler(getQueryVariable('orderid'));
    }
  }, []);

  const orderhandler = (orid) => {
    dispatch(clearCart([]));
  };

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  return (
    <>
      {lod ? (
        <div
          className="h-80 flex flex-col items-center justify-center"
          style={{ display: lod ? 'flex' : 'none' }}
        >
          <div className="lds-facebook flex justify-center items-center">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="mt-4 text-lg font-bold text-moon-200">الرجاء الإنتظار</div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative bg-white/30 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-10 flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 120 }}
              className="text-green-500 text-[6rem]"
            >
              <FaCheckCircle />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-bold text-2xl mt-4"
            >
              تمت عملية الدفع بنجاح
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-gray-800 mt-2"
            >
              يمكنك متابعة التسوق أو عرض الطلب في حسابك.
            </motion.p>

            <div className="flex mt-6 gap-4 flex-wrap justify-center w-full">
              {isLogged && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => router.push('/user')}
                    variant="shadow"
                    className="bg-gray-600 text-white text-sm rounded-lg shadow-md flex items-center gap-2"
                    endContent={<FaListAlt />}
                  >
                    عرض الطلبات
                  </Button>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => router.push('/')}
                  variant="shadow"
                  className="bg-green-200 text-white text-sm rounded-lg shadow-md flex items-center gap-2"
                  endContent={<FaShoppingBasket />}
                >
                  متابعة التسوق
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default AccounteEl;
