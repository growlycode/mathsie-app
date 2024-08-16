import { useEffect } from "react";
import { UserWorksheet } from "../../../core/workbook";
import { listWithItemReplaced } from "../../../infrastructure/util/array";
import { WorksheetPage } from "../worksheet/worksheet";
import { PageControls } from "./controls";
import useWorkbookStore from "../../../store/workbookStore";
import { DataLoading } from "../site/data-loading";
import { SiteHeader } from "../site/header";

export function WorkbookPage() {

  const { workbook, currentPage, setPage, fetchWorkbookForUser, saveWorkbook, loading, error } = useWorkbookStore();


  useEffect(() => {
    fetchWorkbookForUser()
  }, []);

  function updateUserWorkbook(uws: UserWorksheet) {
    workbook && saveWorkbook({ ...workbook, worksheets: listWithItemReplaced(uws.id, uws, workbook!.worksheets) });
    return Promise.resolve();
  }

  return (
    <div className='mathsie-workbook'>
      <SiteHeader>
        {!!workbook && <PageControls currentPage={currentPage} totalPages={workbook.worksheets.length} setPage={setPage} />}
      </SiteHeader>
      <DataLoading title={"workbook"} emptyMessage={"No workbooks assigned"} isLoading={loading} hasError={!!error} hasData={!!workbook}>
        {() => {
          return <>
            <WorksheetPage uworksheet={workbook!.worksheets[currentPage]} onSave={updateUserWorkbook} />
          </>
        }}
      </DataLoading>

    </div>
  );
}

