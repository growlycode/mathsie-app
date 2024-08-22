import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../auth/hooks";
import { auth } from "../../../../api/firebase-init";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { appendStyle } from "../../../../infrastructure/util/css";
import { nav } from "../../../../routes/nav";


const AppSidebar = ({ className }: { className?: string }) => {
  const { user } = useAuth(auth);
  const [currentPage, setCurrentPage] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {

    user?.getIdTokenResult().then(token => {
      setIsAdmin(token.claims.role == "marker");
    });
  }, [user])

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar id="sidebar" aria-label="Sidebar with multi-level dropdown example" className={`flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 h-full duration-75 border-r border-gray-200 lg:flex transition-width dark:border-gray-700 w-64${appendStyle(className)}`}>
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <Sidebar.Items>
            { nav.filter(item => isAdmin || !item.requiresAdmin).map((item, itemIdx) => {
              return <Sidebar.ItemGroup key={`ig${itemIdx}`}>
                  {item.items
                  .filter(item => isAdmin || !item.requiresAdmin)
                  .map((i, idx) => <LinkItem key={`li-${itemIdx}-${idx}`} href={i.href} text={i.text} icon={i.icon} currentPage={currentPage} />)}
              </Sidebar.ItemGroup>
            })}
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

const LinkItem = ({ text, href, icon, currentPage }: { text: string, href: string, icon: IconType, currentPage: string }) => {

  const isCurrentPageClass = (path: string) => {
    return path === currentPage ? 'bg-gray-100 dark:bg-gray-700' : '';
  }

  return <li>
    <Link to={href} aria-labelledby="flowbite-sidebar-item-:rh:" className={`flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isCurrentPageClass(href)}`}>

      {icon({ className: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" })}
      <span className="px-3 flex-1 whitespace-nowrap" data-testid="flowbite-sidebar-item-content" id="flowbite-sidebar-item-:rh:">{text}</span>

    </Link>

  </li>
}
export default AppSidebar;
