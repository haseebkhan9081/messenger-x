"use client";
import Avatar from "@/app/components/Avatar";
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import  DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import SettingsModal from "./SettingsModal";
interface DesktopSidebarprops{
    currentUser:User
} 
const DesktopSidebar:
React.FC<DesktopSidebarprops>=
({
    currentUser
}:DesktopSidebarprops)=>{
const routes=useRoutes();
const [isOpen,setIsOpen]=useState(false);
console.log(currentUser)
return <>
<SettingsModal
currentUser={currentUser}
isOpen={isOpen}
onClose={()=>setIsOpen(false)}/>

    <div
    className="
    hidden
    lg:fixed
    lg:inset-y-0
    lg:left-0
    lg:z-40
    lg:w-20
    xl-px-6
    lg:overflow-y-auto
    lg:bg-white
    lg:border-r-[1px]
    lg:pb-4
    lg:flex
    lg:flex-col
    justify-between
    "><nav
    className="
    mt-4
    flex
    flex-col
    justify-between
    "
    >
        <ul
        role="list"
        className="
        flex 
        flex-col
        items-center
        space-y-1
        ">
            {routes.map((items)=>(
               <DesktopItem
               key={items.label}
               href={items.href}
               label={items.label}
               active={items.active}
               onClick={items.onClick}
               Icon={items.icon}
               />
            ))}


        </ul>
        </nav>
        <nav
        className="
        flex
        flex-col
        mt-4
        justify-between
        items-center
        "
        >
<div
onClick={()=>setIsOpen(true)}
className="
cursor-pointer
hover:opacity-75
transition">
<Avatar 
user={currentUser}
/>
</div>
        </nav>
        
        </div>
    </>
 }
 export default DesktopSidebar;