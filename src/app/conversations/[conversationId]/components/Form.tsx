"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import MessageInput from "./MessageInput";
import {RxPaperPlane} from "react-icons/rx"
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
const Form=()=>{
  
const [Ivalue,setIvalue]=useState<string>("");
const {conversationId}=useConversation();
const {
    register,
    handleSubmit,
    setValue,
     
    formState:{
        errors
    }
}=useForm<FieldValues>({
    defaultValues:{
        message:''
    }
})
const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setValue('message',"",{shouldValidate:true});
    setIvalue("");
    axios.post('/api/messages',{
        ...data,
        conversationId
    })
}
const handleUpload=(result:any)=>{
    console.log("the link send for image",result?.info?.secure_url);
axios.post('/api/messages',{
    
    image:result?.info?.secure_url,
    conversationId
}).then((response)=>{
    console.log("response when sending the image",response)
}).catch((error)=>{
    console.log("errors when sending the image",error);
})
}

    return <>
    <div
    className="px-4
    py-4
    bg-white
    border-t
    flex
    items-center
    gap-2
    lg:gap-4
    w-full
    ">
        <CldUploadButton
        
        options={{
            maxFiles:1
        }}
        onUpload={handleUpload}
        uploadPreset="smdaleig"
        >
        <MdAddPhotoAlternate
        size={32}
        className="text-sky-500
        hover:text-sky-600
        transition"/>
</CldUploadButton>

        <form
        className="
        flex
        w-full
        gap-2
        lg:gap-4
        items-center
        "
        onSubmit={handleSubmit(onSubmit)}>
<MessageInput
register={register}
id="message"
type="text"
placeholder="write a message"
errors={errors}
required={true}
 
 
/>
<button
type="submit"
className="
p-2
rounded-full
bg-sky-500
cursor-pointer
hover:bg-sky-600
transition">
<RxPaperPlane
size={18}
className="text-white"/>
</button>
        </form>
        </div></>
}

export default Form;