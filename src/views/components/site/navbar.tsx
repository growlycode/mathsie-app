import type { FC } from "react";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../../../assets/mathsie-icon.svg";
import LogoutButton from "../auth/logout-button";
import useWorkbookStore from "../../../store/workbookStore";

const ExampleNavbar: FC = function () {

  const { toggleSidebar } = useWorkbookStore();

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navbar.Brand href="/">
              <img alt="" src={logo} className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                mathsie
              </span>
            </Navbar.Brand>
            <button data-testid="flowbite-navbar-toggle"
            onClick={toggleSidebar}
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden">
              <span className="sr-only">Open main menu</span>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" aria-hidden="true" className="h-6 w-6 shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
              </svg></button>
          </div>
          <div className="flex items-center gap-3">
            <DarkThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
