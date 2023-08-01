import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
interface Iparams{
    conversationId?:string
}


export async function POST( 
    request:Request,
    {params}:{params:Iparams}
){
    try{
 const currentUser=await getCurrentUser();
 const {conversationId}=params;
 if(!currentUser?.id ||!currentUser?.email){
    return new NextResponse('Unauthorized',{status:401});

 }
 const conversation=await prisma.conversation.findUnique({
    where:{
        id:conversationId
    },
    include:{
        messages:{
            include:{
                seen:true
            }
        },
    users:true
    }
 }) ;
 if(!conversation){
    return new NextResponse('Invalid Id',{status:400});
 }


const lastMessage
=conversation.messages[conversation.messages.length-1];
//if we dont have a last message then just return the default
if(!lastMessage){
    return NextResponse.json(conversation);
}
//if there is a last message we update the seen status for this current user
const updatedMessage=await prisma.message.update({
    where:{
        id:lastMessage.id
    },
    include:{
        seen:true,
        sender:true
    },
    data:{
       seen:{
        connect:{
            id: currentUser.id
        }
       } 
    }
});
await pusherServer.trigger(currentUser.email,
    'conversation:update',{
        id:conversationId,
        messages:[updatedMessage]
    })
if(lastMessage.seenIds.indexOf(currentUser.id)!== -1){
    return NextResponse.json(conversation)
}

await pusherServer.trigger(conversationId!,'message:update',updatedMessage);


return NextResponse.json(updatedMessage);





    }catch(error:any){
        console.log(error,"error MESSAGE_SEEN");
        return new NextResponse('Internal Error'
        ,{status:500});
    }
}