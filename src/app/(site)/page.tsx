import Image from "next/image" 
import icon from "../../../public/images/rocketchat.svg";
import AuthForm from "./components/AuthForm";
export default function Home() {
    return (
        <>
        <div className="
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm:px-6
        lg-px-8
        bg-gray-100
        ">
      <div className="sm:mx-auto 
      sm:w-full
       sm:max-w-md">
        <Image src="/images/logo.png"
         height="48" width="48" 
         alt="logo" className="mx-auto w-auto"/>
      <h2 className="
      mt-6
       text-center
       text-3xl
       font-bold
       tracking-tighter
       text-gray-900">
        Sign in to your account 

      </h2>
       </div>
       <AuthForm/>

        </div>
        </>
    )
  }
  