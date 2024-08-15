import { useEffect, useState } from "react";
import { UserWorksheet } from "../../../core/workbook";
import { listWithItemReplaced } from "../../../util/array";
import { WorksheetPage } from "../worksheet/worksheet";
import { PageControls } from "./controls";
import useWorkbookStore from "../../../store/workbookStore";

export function WorkbookPage() {

    const { workbook, currentPage, setPage, fetchWorkbookForUser, saveWorkbook } = useWorkbookStore();
    const [isMarking, setIsMarking] = useState<boolean>(false);
    
    
    useEffect(() => {
        fetchWorkbookForUser()
    }, []);

    if (!workbook) return null;
  
    function updateUserWorkbook(uws: UserWorksheet) {
      workbook && saveWorkbook({ ...workbook, worksheets: listWithItemReplaced(uws.id, uws, workbook!.worksheets) });
      return Promise.resolve();
    }
  
    return (
      <div className='mathsie-workbook'>
        <PageControls currentPage={currentPage} totalPages={workbook.worksheets.length} setPage={setPage}
          isMarkingMode={isMarking} setIsMarkingMode={setIsMarking} />
        <WorksheetPage uworksheet={workbook.worksheets[currentPage]} isMarking={isMarking} onSave={updateUserWorkbook} />
      </div>
    );
  }
  
  