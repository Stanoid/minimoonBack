import {React,useEffect,useState,useContext} from 'react'
import { CURRENCY, Theme } from '../local'
import { color, motion } from 'framer-motion'
import { CartCon } from '../contexts/cartContext';
import { Divider } from '@nextui-org/react';

// Import a checkmark icon. You might need to install a library like 'react-icons'
// For example: `npm install react-icons` and then `import { FaCheck } from 'react-icons/fa';`
// For simplicity, I'll use a basic SVG checkmark here.
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);


function OptionEL(props) {

const [refr,setRefr] = useState(true);
const [sizes,setSizes] = useState(null);
const [colors,setColors]=useState(null);
const [sizeId,setSizeId] = useState(null)
const { useNotifi } =
    useContext(CartCon);


    useEffect(() => {
      
        var size = []
        var sizeob=[]
        var colors = [];

        props.vars.forEach(element => {
            colors.push({sizeid:element.attributes.sizes.data[0].id,varid:element.id,color:element.attributes.colors.data[0],qty:element.attributes.stock});
            if(size.includes(element.attributes.sizes.data[0].id)){
            // Size already added, do nothing
            }else{
                size.push(element.attributes.sizes.data[0].id);
                sizeob.push(element.attributes.sizes.data[0]);
            }
        });

        console.log("all colors",props.vars[0]);
        console.log(sizeob);
        setSizes(sizeob);
        setSizeId(sizeob[0].id); // Select the first size by default
        setColors(colors);
        // Initial selection for color based on the first size
        const initialColorVar = colors.find(c => c.sizeid === sizeob[0].id);
        if (initialColorVar) {
            props.varselect(initialColorVar.varid);
        }
      
    }, [refr, props.vars]); // Added props.vars to dependency array to re-run if variants change
    
    const handlesizeselect = (size)=>{
        setSizeId(size);
        // Find and select the first available color for the newly selected size
        const selectedColorForSize = colors.find(element => element.sizeid === size);
        if (selectedColorForSize) {
            props.varselect(selectedColorForSize.varid);
        }
    };


    const varDisplay = ()=>{
        for (let i = 0; i < props.vars.length; i++) {
            if(props.vars[i].id == props.vari){
                return (
                    <div className=' space-y-2 flex font-bold whitespace-nowrap justify-around p-4 border-0  border-moon-200 rounded-md items-center'>
                        <div className='flex items-center space-x-3'>
                            <div>{props.vars[i].attributes.colors.data[0].attributes.name_ar}</div>
                            <div style={{backgroundColor:props.vars[i].attributes.colors.data[0].attributes.colorCode}} className='w-8 h-8 rounded-full' ></div>
                        </div>
                        <div className='flex flex-col' >
                            <div className='flex items-center space-x-3 '>
                                <div>{props.vars[i].attributes.sizes.data[0].attributes.name_ar}</div>  
                                <div> ({props.vars[i].attributes.sizes.data[0].attributes.icon}) </div> 
                            </div>
                            <div dir='rtl' className='flex items-center  space-x-3 '>
                                <div>{props.vars[i].attributes.price} {CURRENCY} </div>  
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    };


    return (
        <div className='flex flex-col justify-between items-start space-y-3' >
            {/* <div className='w-full'>
                {varDisplay()}
            </div> */}


            <div className='space-y-3 w-full' >
                {/* Size Section */}
                <div className='flex flex-col items-start w-full'>
                    <div className='font-bold text-lg mb-2'> المقاس</div>
                    <div className='flex flex-wrap justify-start w-full text-sm'>
                        {sizes && sizes.map(vari => (
                            <div onClick={() => { handlesizeselect(vari.id) }} key={vari.id}
                                className={`${sizeId == vari.id ? 'border-moon-200' : 'border-gray-500'} border-2 cursor-pointer mt-2 mr-2 px-4 py-2 rounded-md`}
                                style={{
                                    backgroundColor: sizeId == vari.id ? Theme.primary : "white",
                                    color: sizeId == vari.id ? "white" : "black",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "row"
                                }}>
                                {vari.attributes.icon}
                            </div>
                        ))}
                    </div>
                </div>


                {/* Color Section */}
                <div className='flex flex-col items-start w-full'>
    <div className='font-bold text-lg mb-2'> اللون</div>
    <div className='flex flex-wrap justify-start w-full space-x-3'>
        {colors && colors.map(color => (
            color.sizeid == sizeId ? (
                // This is the div that needs the square border and background when selected
                <div key={color.varid}
                     style={{opacity:color.qty <= 0 ? 0.3 : 1}}
                     onClick={() => { color.qty <= 0 ? useNotifi("error", "نفذت الكمية من هذا الخيار") : props.varselect(color.varid) }}
                     className={`
                        flex flex-col justify-center items-center space-y-1
                        p-2 rounded-lg cursor-pointer transition-all
                        ${props.vari == color.varid ? 'border lg:w-[68] shadow-lg bg-red-100' : 'border-4 border-transparent shadow-none'}
                     `} // Added border-4, rounded-lg, p-2, and conditional classes
                     style={{
                         borderColor: props.vari == color.varid ? Theme.primary : 'transparent', // Make border transparent when not selected
                         backgroundColor: props.vari == color.varid ? '#fde0e6' : 'transparent', // Light pink background for selected, transparent for others
                         // You might also need to explicitly set flex direction if it's not inherited
                         // from previous classes, or ensure it doesn't break your layout.
                         // For the image, the text is below the circle, so flex-col is correct.
                     }}
                >
                    {/* This div remains for the color circle */}
                    <div
                        className='w-9 h-9 rounded-full flex items-center justify-center'
                        style={{backgroundColor:color.color.attributes.colorCode}}
                    >
                        {props.vari === color.varid && <CheckIcon />}
                    </div>
                    <div
                        style={{
                            color: props.vari == color.varid ? Theme.primary : Theme.primaryDark,
                        }}
                        className='font-semibold text-xs whitespace-nowrap' >
                        {color.color.attributes.name_ar}
                    </div>
                </div>
            ) : null
        ))}
    </div>
</div>
            </div>
        </div>
    );
}

export default OptionEL;