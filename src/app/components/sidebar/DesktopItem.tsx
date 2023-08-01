"use client";
 
import clsx from "clsx";
import Link from "next/link";
import {HiChatBubbleBottomCenterText} from "react-icons/hi2";
interface itemsprops{
    
    href :string
    label :string
    active?:boolean 
    onClick ?:()=> void; 
    Icon :any
}
const DesktopItem:React.FC<itemsprops>=({
    href  ,
    label  ,
    active ,
    onClick , 
     Icon ,
}:itemsprops)=>{
    const handleClick=()=>
    {
        if(onClick){
            return onClick();
        }
    }
    return <>
    <li
    onClick={handleClick}
     
    >
        <Link
        href={href}
        className={
            clsx(`
            group
            flex
            gap-x-3
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100

            `,
            active && "bg-gray-100 text-black",
            active && "text-black")
        }
        >
            <Icon 
            className="
            w-6
            h-6
            shrink-0"/>
            
            <span
            className="sr-only">
                {label}
            </span>
        </Link>

    </li>
    </>
}
export default DesktopItem;