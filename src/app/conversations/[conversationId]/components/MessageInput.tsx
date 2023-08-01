"use client";
import { ChangeEventHandler, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {ChangeEvent} from "react";
 
 interface MessageInputprops{
placeholder?:string;
id:string;
required?:boolean;
register:UseFormRegister<FieldValues>;
errors:FieldErrors;
type?:string,
inputValue?:string,
 

 }
 
const MessageInput:React.FC<MessageInputprops>=({
    required,
    register,
    id,
    placeholder,
    errors,
    type,
    inputValue,
    
   
})=>{
     
    return <>
    <div
    className="relative 
    w-full
    ">
     <input
     id={id}
     type={type}
     placeholder={placeholder}
     value={inputValue}
   
     
     {...register(id,{required:required})}
     className="w-full
      rounded-full
      focus:outline-none
     text-black
     py-2
     px-4
     font-light
     bg-neutral-100
     "
     
      
     />
        </div></>
}

export default MessageInput;