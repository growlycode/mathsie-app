import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCog
} from "react-icons/hi";

const ExampleSidebar: FC = function () {

  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar id="sidebar" aria-label="Sidebar with multi-level dropdown example" className="hidden md:block flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 h-full duration-75 border-r border-gray-200 lg:flex transition-width dark:border-gray-700 w-64">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/workbook"
                icon={HiClipboard}
              >
                Workbook
              </Sidebar.Item>
              <Sidebar.Item
                href="https://flowbite-react.com/"
                icon={HiCog}
              >
                Settings
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
