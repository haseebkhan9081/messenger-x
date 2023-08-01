"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
 import axios from "axios";
import { useRef, useState,useEffect } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
interface Bodyprops{
    initialMessages:FullMessageType[]
}
const Body:React.FC<Bodyprops>=({initialMessages}
    
)=>{
    const [messages,setMesages]=useState(initialMessages);
    const bottomRef=useRef<HTMLDivElement>(null);
     
    const {conversationId}=useConversation();


    
useEffect(()=>{
   
axios.post(`/api/conversations/${conversationId}/seen`).then((response)=>{
    console.log("conversatonId making reques to is ",conversationId);
    console.log("response from message Box making api request to seen ",response);
});
},[conversationId])

useEffect(()=>{
pusherClient.subscribe(conversationId);
bottomRef?.current?.scrollIntoView();
const messageHandler=(message:FullMessageType)=>{
setMesages((current)=>{
    axios.post(`/api/conversations/${conversationId}/seen`);
    if(find(current,{id:message.id})){
        return current;
    }
    return [...current,message];
});
bottomRef?.current?.scrollIntoView();


}
const updateMessage=(newMessage:FullMessageType)=>{
setMesages((current)=>current.map((currentMessage)=>{
    if(currentMessage.id===newMessage.id){
        return newMessage;
    }

    return currentMessage;
}))
}

pusherClient.bind('messages:new',messageHandler);
pusherClient.bind('message:update',updateMessage);
return ()=>{
    pusherClient.unsubscribe(conversationId);
    pusherClient.unbind('messages:new',messageHandler);
    pusherClient.unbind('message:update',updateMessage);
}
},[conversationId]);

    return <>
    <div
    className="flex-1
    overflow-y-auto
    "
    >
        {messages.map((message:FullMessageType,i:Number)=>(
             <MessageBox
             key={message.id}
             isLast={i===messages.length-1}
             data={message} 
             />
             
        ))}
        <div ref={bottomRef} className="
        pt-24"
         />
        </div></>
}

export default Body;