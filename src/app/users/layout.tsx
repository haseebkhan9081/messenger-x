import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./component/UserList";
export default async function UserLayout({children}:{children:React.ReactNode}){
    const users= await getUsers();
    return <>

    <Sidebar>
        
        <div
    className="h-full

    ">
        <UserList
        
        items={users}/>
        {children}
        
        </div>
    
    </Sidebar>
    </>
};