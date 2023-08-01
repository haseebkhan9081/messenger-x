"use client";
import clsx from "clsx";
import Link from "next/link";

interface MobileItemprops{
    href:string,
    label:string,
    active?:boolean,
    onClick?:()=>void,
    Icon:any,

}
const MobileItem:React.FC<MobileItemprops>=({
    href,
    label,
    active,
    onClick,
    Icon
})=>{
    const handleClick=()=>{
        if(onClick){
            return onClick();
        }

    }
    return <>
      
        <Link
        href={href}
        onClick={handleClick}
    className={clsx(
        `group
         flex
         gap-x-3
         leading-6
         font-semibold
         w-full
         justify-center
         p-4
         text-gray-500
         hover:text-black
         hover:bg-gray-100

        `,
        active && 'bg-gray-100 text-black'
    )}
        >
            <Icon
            className="
            w-6
            h-6
             
            "
            />
          
     
        </Link>
         
     </>
}
export default MobileItem;