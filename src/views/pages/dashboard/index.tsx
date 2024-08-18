/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table } from "flowbite-react";
import { useEffect, type FC } from "react";
import useWorkbookStore from "../../../store/workbookStore";

const DashboardPage = function () {


  return (
    <div className="px-4 pt-6">
      <div className="">
        <LatestWorkbooks />
      </div>
    </div>
  );
};
const LatestWorkbooks: FC = function () {

  const { workbooks, fetchWorkbooks } = useWorkbookStore();

  useEffect(() => {
    fetchWorkbooks();
  }, []);

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Latest workbooks
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            The most recent assigned workbooks
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Student</Table.HeadCell>
                  <Table.HeadCell>Workbook</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  {workbooks.map(wb => (<Table.Row key={wb.id}>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      <span className="font-semibold">{wb.user?.givenName} {wb.user?.familyName}</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {wb.title}
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <span className="mr-2 rounded-md bg-purple-100 py-0.5 px-2.5 text-xs font-medium text-purple-800 dark:bg-purple-200">
                        {wb.status}
                      </span>
                    </Table.Cell>
                  </Table.Row>))}


                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between pt-3 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Transactions Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardPage;
