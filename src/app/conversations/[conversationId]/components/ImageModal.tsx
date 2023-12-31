"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalprops{
    src?:string|null;
    isOpen?:boolean;
    onClose:()=>void;
    

}
const ImageModal:React.FC<ImageModalprops>=({
    isOpen,
    onClose,
    src
})=>{
    if(!src){
        return null;
    }
    return <>
    <Modal isOpen={isOpen} onClose={onClose}>
<div
className="w-80 h-80
">
<Image
alt="picture"
className="object-cover
"
fill
src={src}/>
</div>
    </Modal>
    </>
}
export default ImageModal;