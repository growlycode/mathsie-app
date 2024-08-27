import { useEffect } from "react";
import { UserWorksheet } from "../../../core/workbook";
import { listWithItemReplaced } from "../../../infrastructure/util/array";
import { PageControls } from "../../components/worksheet/page-controls";
import useWorkbookStore from "../../../store/workbookStore";
import { DataLoading } from "../../components/site/data-loading";
import { WorksheetPage } from "../../components/worksheet/worksheet";
import Navbar from "../../components/site/navbar";
import { useAuth } from "../../../auth/hooks";
import { auth } from "../../../api/firebase-init";
import { ResponsiveSidebar } from "../../components/site/sidebar/responsive-sidebar";

function WorkbookPage() {

  const { user } = useAuth(auth);
  const { workbook, currentPage, setPage, fetchWorkbookForUser, saveWorkbook, loading, error } = useWorkbookStore();


  useEffect(() => {
    if (user?.uid) {
      fetchWorkbookForUser(user.uid);
    }
  }, []);

  function updateWorkbook(uws: UserWorksheet) {
    saveWorkbook({ ...workbook!, worksheets: listWithItemReplaced(uws.id, uws, workbook!.worksheets), });
    return Promise.resolve();
  }

  // function onSubmitWorkbook() {
  //   submitWorkbook(workbook);
  //   return Promise.resolve();
  // }

  return (<>
    <Navbar>
      {!!workbook && <PageControls currentPage={currentPage} totalPages={workbook.worksheets.length} setPage={setPage} />}
    </Navbar>

    <ResponsiveSidebar />
    <div className="flex items-start pt-16 w-full h-full">
      <DataLoading title={"workbook"} emptyMessage={"No workbooks assigned"} isLoading={loading} hasError={!!error} hasData={!!workbook}>
        {() => {
          return <>
            <WorksheetPage uworksheet={workbook!.worksheets[currentPage]} onSave={updateWorkbook} />
          </>
        }}
      </DataLoading>

    </div>

  </>

  );
}

export default WorkbookPage;