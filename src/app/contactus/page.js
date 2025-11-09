'use client'

import React from 'react';
import Logowhite from "../../../public/logored.svg";
import Glob from "../../../public/glb.svg";
import Ind from "../../../public/ind.svg";
import Sft from "../../../public/sft.svg";
import Sel from "../../../public/sel.svg";
import Car from "../../../public/car.svg";
import Pas from "../../../public/pas.svg";
import Cre from "../../../public/cre.svg";
import Ino from "../../../public/ino.svg";
import Fun from "../../../public/fun.svg";
import Cur from "../../../public/cur.svg";
import Wrld from "../../../public/wrld.svg"



import Image from 'next/image';
import { IMG_URL } from '../local';
import { useI18n } from '../lib/i18n';

function AccounteEl() {
  const { direction, locale, t } = useI18n();
  
  return (
  
<div lang={locale} dir={direction} className='mt-16 w-full'>

<section style={{backgroundSize:50}} className={`flex w-full justify-center bg-[url('../../public/amblemblack.svg')] items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-4' >
  <div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('aboutCompany')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('aboutCompanyText')}
  </p>
</div>
<div className='flex justify-center items-center p-4'>
<Logowhite  width={300} />
</div>
</section>


<section style={{backgroundSize:50}} className={`flex w-full justify-center items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-4' >
  <div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourHistory')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
 <span className='font-semibold' >
  {t('ourHistoryBold')}
 
 </span> <br/>
 {t('ourHistoryText')}
  </p>
</div>
<div className='flex justify-center items-center p-4'>
<Glob  width={300} />
</div>
</section>

<section style={{backgroundSize:50}} className={`flex py-8 w-full justify-center bg-[url('../../public/amblemblack.svg')] items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-2 w-full' >
  <div className={`font-bold px-0 sm:px-0 lg:px-20 text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourProducts')}</div>

<div className='flex items-center justify-center'>

<div className='w-full gap-3 sm:w-full lg:w-2/3' style={{

display:"grid",

gridTemplateAreas:`
'. . prd0 prd0 . .'
'prd1 prd1 . . prd2 prd2'
'. prd3 prd3 prd4 prd4 .'
'prd5 prd5 . . prd6 prd6'
'. prd7 prd7 prd8 prd8 .' 


`
   }} >
    
    <div className='   relative rounded-sm' style={{gridArea:"prd0"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35277_12_b2fd588a57.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>نسائي</div>
      
    </div>

    <div className='   relative rounded-sm' style={{gridArea:"prd1"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35277_2_9da2e13111.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>لانجيري</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd2"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_10_c4c3e9fc09.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>بيجامات</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd3"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_0223f582a2.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>جلابيات</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd4"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35292_1_a512c4865e.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>بناتي</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd5"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_d100db5770.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>سراويل</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd6"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35292_1_0ff556f4ec.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>موضه واناقة</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd7"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_5be8d27a73.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>ولادي</div>
      
    </div>

    <div className='   relative rounded-sm' style={{gridArea:"prd8"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35277_12_b2fd588a57.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>ملابس TRD</div>
      
    </div>

 
   
 
   </div>

</div>



</div>

</section>



<section style={{backgroundSize:50}} className="flex w-full justify-center   items-center flex-col">

<div className=' p-4' >
  <div className='font-bold text-2xl'> لدينا الجودة والتركيز على القيم</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
  نعتقد أن الجودة ليست فقط حول المنتج ولكن أيضا حول تجربتها. هذا هو
صحيح بشكل خاص للملابس لأن الراحة التي يحصل عليها المرء من الملابس هي جزء من الإجمالي، تجربة حميمة من نوعية الحياة.
في الوقت نفسه، نعتقد أن الجودة لا يجب أن تكون باهظة الثمن. يثق عملاؤنا في علامتنا التجارية بسبب القيمة الاستثنائية التي يحصلون عليها. هذه الثقة تأتي فقط من التجربة، ونحن فخورون بعملائنا المخلصين لدينا. يحصل عملائنا أيضا على خيار كبير لتحديد الملابس لكل ميزانيتهم
  </p>
</div>

</section>

<section style={{backgroundSize:50}} className={`flex w-full justify-center bg-[url('../../public/amblemblack.svg')] items-center ${direction === 'rtl' ? 'flex-col-reverse' : 'flex-col'}`}>


<div className='flex justify-center flex-col items-center p-4'>
<div className='font-bold text-2xl text-center'>{t('childrenDesigns')}</div>
<div className={`flex ${direction === 'rtl' ? 'flex-wrap-reverse' : 'flex-wrap'} justify-center my-3`}>




<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Cur  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('curiosity')}</div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Fun  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('fun')}</div>
  </div>


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Ino  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('innocence')}</div>
  </div>


  <div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Cre  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('creativity')}</div>
  </div>




  
</div>
</div>



<div className='flex justify-center flex-col items-center p-4'>
<div className='font-bold text-2xl text-center'>{t('womenDesigns')}</div>
<div className='flex flex-wrap justify-center my-3' >


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Pas  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('passion')}</div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Car  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('care')}</div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Sel  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('selfAffirmation')}</div>
  </div>


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Sft  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('tenderness')}</div>
  </div>


  <div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Ind  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('individuality')}</div>
  </div>




  
</div>
</div>
<div className=' p-4' >
  <div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourDesigns')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('designsText')}
   </p>
</div>

</section>



<section style={{backgroundSize:50}} className="flex w-full justify-center   items-center flex-col">
<div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('marketsWeServe')}</div>
<div className=' p-4' >
<div>
  <Wrld width={"100%"} />
</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('marketsText')}
  </p>
</div>

</section>



</div>


  )
}

export default AccounteEl






















































