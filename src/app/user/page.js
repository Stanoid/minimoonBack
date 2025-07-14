'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { User } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
//import Orders from './orders';
import dynamic from 'next/dynamic';
import { AuthCon } from '../contexts/AuthCon';
import { FaBox, FaCreditCard, FaHeart, FaListCheck, FaLock, FaPowerOff, FaRecycle, FaUser } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Orders = dynamic(() => import('./orders'))
const Favo = dynamic(() => import('./favo'))
const UserData = dynamic(() => import('./userData'))
const PasSet = dynamic(() => import('./pasSet'))
const Address = dynamic(() => import('./address'))
const PaymentMeth = dynamic(() => import('./paymentmeth'))

function AccounteEl() {
    const ls = require("local-storage")

    const router = useRouter(); 
    const [page,setPage] = useState(1) 
    const [lod,setLod] =useState(true)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    useEffect(() => {
   loginval();  
  
    },[])



   
    const loginval = ()=>{
      if(udata.data.user.type!=4){router.push("/login")}
      //console.log(utype)
         }
      



    
  


  const handleEdit = (pageid,id)=>{

    setPid(id)

   setPage(pageid)


  }

  
 

  return (
  
<>

{
    
    <div dir='rtl' style={{minHeight:"100vh",userSelect:"none",minWidth:"100vw",backgroundSize:50}}  className="w-full   
    bg-[url('../../public/amblemblack.svg')] ">


<div className='w-full flex  flex-col  sm:flex-col lg:flex-row  mt-10    justify-center'>

<div className='min-w-60    p-2 ' >

<div  className='w-full p-3 flex  flex-col   lg:min-h-96 shadow-lg bg-white'>

<div >
<User   
      name={udata.data.user.username}
      description={udata.data.user.email}
      avatarProps={{
        className:"bg-gray-100 font-bold text-white"
      }}
    />
</div>
<div
  style={{ width: "100%", overflowX: "scroll" }}
  className="flex text-sm sm:flex-row mt-3 lg:flex-col scrollable-content"
>
  <div
    onClick={() => setPage(1)}
    className={`flex px-2 py-3 cursor-pointer transition-colors justify-start items-center whitespace-nowrap
      ${page === 1 ? 'bg-gray-100 font-bold text-gray-900' : 'bg-white text-gray-900'}
      hover:bg-gray-100 lg:border-b-2 lg:border-gray-200`}
  >
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>


    </div>
    <div className="mx-1.5">الطلبات</div>
  </div>

  <div
    onClick={() => setPage(3)}
    className={`flex px-2 py-3 cursor-pointer transition-colors justify-start items-center whitespace-nowrap
      ${page === 3 ? 'bg-gray-100 font-bold text-gray-900' : 'bg-white text-gray-900'}
      hover:bg-gray-100 lg:border-b-2 lg:border-gray-200`}
  >
    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</div>
    <div className="mx-1.5">البيانات الشخصية</div>
  </div>

  <div
    onClick={() => setPage(4)}
    className={`flex px-2 py-3 cursor-pointer transition-colors justify-start items-center whitespace-nowrap
      ${page === 4 ? 'bg-gray-100 font-bold text-gray-900' : 'bg-white text-gray-900'}
      hover:bg-gray-100 lg:border-b-2 lg:border-gray-200`}
  >
    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
</div>
    <div className="mx-1.5">تغيير كلمة المرور</div>
  </div>

  <div
    onClick={() => setPage(5)}
    className={`flex px-2 py-3 cursor-pointer transition-colors justify-start items-center whitespace-nowrap
      ${page === 5 ? 'bg-gray-100 font-bold text-gray-900' : 'bg-white text-gray-900'}
      hover:bg-gray-100 lg:border-b-2 lg:border-gray-200`}
  >
    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
</div>
    <div className="mx-1.5">تعديل العنوان</div>
  </div>

  {/* <div
    onClick={() => setPage(6)}
    className={`flex px-2 py-3 cursor-pointer transition-colors justify-start items-center whitespace-nowrap
      ${page === 6 ? 'bg-gray-100 font-bold text-gray-900' : 'bg-white text-gray-900'}
      hover:bg-gray-100 lg:border-b-2 lg:border-gray-200`}
  >
    <div><FaCreditCard /></div>
    <div className="mx-1.5">وسائل الدفع</div>
  </div> */}

  <div
    onClick={() => setPage(7)}
    className={`flex px-2 py-3 cursor-pointer transition-colors justify-start items-center whitespace-nowrap
      ${page === 7 ? 'bg-gray-100 font-bold text-gray-900' : 'bg-white text-gray-900'}
      hover:bg-gray-100 lg:border-b-2 lg:border-gray-200`}
  >
    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
</div>
    <div className="mx-1.5">سياسة إسترجاع البضائع</div>
  </div>

  <div
    onClick={() => router.push("/logout")}
    className="flex px-2 py-3 rounded-sm cursor-pointer whitespace-nowrap transition-colors
      hover:text-red-00 text-red-500 justify-start items-center"
  >
    <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>
</div>
    <div className="mx-1.5">تسجيل خروج</div>
  </div>
</div>


</div>

</div>
<div className='w-full sm:w-full lg:w-2/3  p-2' >


<div className='min-h-96 px-2 py-5 w-full shadow-lg bg-white'>

<div style={{display:lod?"flex":"none"}}  className='w-full min-h-96 flex items-center justify-center' >
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>

<div style={{display:lod?"none":"block"}} >
{page== undefined ? <div/> :<></>}
  {page==1 ? <Orders setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==2 ? <Favo setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==3 ? <UserData setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==4 ? <PasSet setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==5 ? <Address setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==6 ? <PaymentMeth setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
</div>




</div>




</div>

</div>



    </div>
    
}

</>


  )
}

export default AccounteEl




