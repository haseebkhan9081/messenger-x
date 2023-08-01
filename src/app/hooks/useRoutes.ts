import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {HiArrowLeftOnRectangle,HiUsers,HiChatBubbleBottomCenterText} from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes=()=>{
    const pathname=usePathname();
    const {conversationId}=useConversation();
    const routes=useMemo(()=>[
        {
            label:"Chat",
            href:"/conversations",
            icon:HiChatBubbleBottomCenterText,
            active: pathname==='/conversations'|| !!conversationId,
        },
        {
            label:"Users",
            href:"/users",
            active:pathname==='/users',
            icon:HiUsers,


        }
        ,{
            label:"Logout",
            href:"#",
            onClick:()=>signOut(),
            icon:HiArrowLeftOnRectangle,

        }
    ],[pathname,conversationId]);
    return routes;
}; 
export default useRoutes;

