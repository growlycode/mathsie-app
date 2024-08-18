import useWorkbookStore from "../../../../store/workbookStore";
import Sidebar from "./sidebar";

export const ResponsiveSidebar = () => {

    const { showSidebar } = useWorkbookStore();
    return <>
        {showSidebar && <Sidebar className={'lg:hidden'} />}
        {/* Unhide on larger screens */}
        <Sidebar className={'hidden lg:block'} />
    </>
}