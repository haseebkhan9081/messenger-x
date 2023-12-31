import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";
async function Sidebar
({children}:{children:React.ReactNode})
{ const currentUser
    = await getCurrentUser();

    return <>
    <DesktopSidebar 
    currentUser={currentUser!}/>
    <MobileFooter/>
    
    <div
    className="
    h-full">
        <main className="
        lg:pl-20 
        h-full">
        {children}

        </main>
        

    </div>
    </>
}
export default Sidebar;