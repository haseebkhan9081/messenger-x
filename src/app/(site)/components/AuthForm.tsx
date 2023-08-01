'use client'
import {toast} from "react-hot-toast";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
 
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub,BsGoogle} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import axios from "axios";
import {signIn,useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
type variant= 'LOGIN'|'REGISTER';
function AuthForm(){
    const router=useRouter();
    const session=useSession();
    const [variant,setVariant]=useState<variant>('LOGIN');
    const [isLoading,setIsLoading]=useState(false);
   useEffect(()=>{
if(session.status==='authenticated'){
    console.log("Authenticated");
    router.push("/users");
}
   },[session.status,router]);
   const toggleVariant =useCallback(()=>{
    if(variant==='LOGIN'){
        setVariant('REGISTER');
    }else{
        setVariant('LOGIN');
    }
   },[variant]);
   
   const {
    register,
    handleSubmit,
    formState:{
        errors
    }
   }=useForm<FieldValues>({
    defaultValues:{
        name:' ',
        email:' ',
        password:' '
    }
   })
   const onSubmit:
   SubmitHandler<FieldValues>=(data)=>{
    setIsLoading(true);
    if(variant==='REGISTER'){
        //axos register
axios.post('/api/register',data)
.then(()=>signIn("credentials",{...data,redirect:false}))
.catch((error)=>
toast.error("Something went wrong!")
 
).
finally(()=>setIsLoading(false));


    }
    if(variant==='LOGIN'){
         //next login
          
         signIn("credentials",{
            ...data,
            redirect:false
         }).then((response)=>{
 if(response?.error){
 toast.error('invalid credentials');
                }
if(response?.ok && !response?.error){
toast.success('logged in successfully');
router.push("/users");
}
         }).finally(()=>
         setIsLoading(false));
    }
   }
   const socialAction =(action:string)=>{
    setIsLoading(true);
    //social sign in
    signIn(action,{
        redirect:false
    }).then((response)=>{
        if(response?.error){
            toast.error('Social Login Failed!');
        }
        if(response?.ok && !response?.error){
            toast.success('Successfully Loged In');
        }
    }).finally(()=>setIsLoading(false));
   }
    return <><div className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md"

    >
        <div className="bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        " >
<form
   className="
   space-y-6"
  onSubmit={handleSubmit(onSubmit)} >
    {variant==='REGISTER' &&(
<Input id="name"
  label="Name"
  type="text"
   register={register}
   errors={errors}
   disabled={isLoading}
   
   />)}
   <Input
   id="email"
   label="Email address"
   type="email"
   register={register}
   errors={errors}
   
   disabled={isLoading}
   />
    <Input
   id="password"
   label="Password"
   type="password"
   register={register}
   errors={errors}
   
   disabled={isLoading}
   
   />
   <div>
    <Button disabled={isLoading}
    fullWidth
    type="submit"
        >
  {variant==='LOGIN'?"Sign in":"Register"}
    </Button>
   </div>
 
</form>
<div 
className="mt-6">
    <div
    className=
    "relative">
        <div
        className="
         absolute
        inset-0
        flex
        justify-center
        items-center"
        >
    <div  
      className="
      w-full
     border-t
 border-gray-300"/>


             
        </div>
        <div className="
relative 
flex 
justify-center
text-sm">
    <span 
    className="
    bg-white
     px-2 
     text-gray-500
     ">
    Or continue with
    </span>
</div>

    </div>
    
    <div
    className="
    mt-6
    flex gap-2">
<AuthSocialButton
Icon={BsGithub}
onClick={()=> socialAction("github")}
/>
<AuthSocialButton
Icon={FcGoogle}
onClick={()=> socialAction("google")}
/>
    </div>

</div>
<div
className="flex
gap-2
justify-center
text-sm
mt-6
px-2
text-gray-500">
    <div>
        {variant==='LOGIN' ? 'New to Messenger-X ?' : 'Already have an account?'}
    </div>
    <div
    onClick={toggleVariant}
    className="
    underline cursor-pointer"
    >{variant==='LOGIN'?'Create an account':'Login'}</div>

</div>

        </div>
         </div></>
}
export default AuthForm;