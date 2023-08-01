"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxprops{
    data:User
}
const UserBox:React.FC<UserBoxprops>=({
    data
})=>{
    const router=useRouter();
    const [isLoading,setisLoading]=useState(false);
   
    const handleClick=useCallback(()=>{
setisLoading(true);
axios.post('/api/conversations',
{
    userId:data.id
    
}).then((data)=>{
    console.log("Response from api/conversation::",data);
    router.push(`/conversations/${data.data.id}`)
}).finally(()=>setisLoading(false));
    },[data,router]);
    return <>
    {isLoading&&(
        <LoadingModal/>
    )}
    <div
    onClick={handleClick}
    className="
    w-full
    relative 
    flex 
    items-center
    space-x-3
    bg-white
    p-3
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer


    "
    >
        <Avatar
        user={data}
        />
         <div
         className="
         min-w-0
         flex-1
         ">
<div
className="
focus:outline-none">
    <div
    className="
    flex 
    justify-between
    items-centre
    mb-1
    ">
<p
className="text-sm
font-medium
text-gray-900
"
>
    {data.name}
    
</p>
    </div>
</div>
         </div>
        </div>
        </>
}

export default UserBox;