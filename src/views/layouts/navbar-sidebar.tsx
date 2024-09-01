import { Footer } from "flowbite-react";
import { type FC, type PropsWithChildren } from "react";
import Navbar from "../components/site/navbar";
import { MdFacebook } from "react-icons/md";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../../routes/routes";
import { ResponsiveSidebar } from "../components/site/sidebar/responsive-sidebar";
import { appendStyle } from "../../infrastructure/util/css";
import { useAuth } from "../../auth/hooks";
import { auth } from "../../api/firebase-init";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children, isFooter = false }) {
    return (
      <>
        <Navbar />
        <div className="flex items-start pt-16">
          <ResponsiveSidebar />
          <MainContent isFooter={isFooter}>{children}</MainContent>
        </div>
      </>
    );
  };

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  isFooter,
}) {
  
  const { isMarker } = useAuth(auth);
  return (
    <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
      <Routes>
        {routes.filter(r => !r.requiresAdmin || isMarker).map((route, idx) => {
          const path = route.path + (route.childRoutes?.length ? '/*' : '');
          return route.component && (
            <Route
              key={idx}
              path={path}
              element={<div className={`w-full h-full${appendStyle(route.classNames || 'p-4 sm:p-6 xl:p-8')}`}><route.component /></div>} />
          )
        })}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>

      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  );
};

const MainContentFooter: FC = function () {
  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <Footer.LinkGroup>
            <Footer.Link href="#" className="mr-3 mb-3 lg:mb-0">
              Terms and conditions
            </Footer.Link>
            <Footer.Link href="#" className="mr-3 mb-3 lg:mb-0">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#" className="mr-3">
              Licensing
            </Footer.Link>
            <Footer.Link href="#" className="mr-3">
              Cookie Policy
            </Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup>
            <div className="flex gap-x-1">
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <MdFacebook className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaInstagram className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaTwitter className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaGithub className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaDribbble className="text-lg" />
              </Footer.Link>
            </div>
          </Footer.LinkGroup>
        </div>
      </Footer>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; 2024 mathsie.com. All rights reserved.
      </p>
    </>
  );
};

export default NavbarSidebarLayout;
