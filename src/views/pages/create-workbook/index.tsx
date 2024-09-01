
import { useState } from 'react';
import { CreateWorkbookForm } from './components/create-workbook-form';
import { NewUserWorkbook, UserWorksheet } from '../../../core/workbook';
import { WorksheetPage } from '../../components/worksheet/worksheet';
import { resolved } from '../../../infrastructure/util/noop';
import { PageControls } from '../../components/worksheet/page-controls';
import { FormButton } from '../../components/buttons/form-button';
import useWorkbookStore from '../../../store/workbookStore';




const CreateWorksheetPage = () => {

  const [wb, setWb] = useState<NewUserWorkbook>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { createWorkbook } = useWorkbookStore();

  const worksheets = wb?.worksheets || [];
  const curr: UserWorksheet| undefined = worksheets.length ? { ...worksheets[currentPage], id: 'dd', paths: []}: undefined; 

  const onPreviewWorkbook = (wb: NewUserWorkbook) => {
    setWb(wb);
  }

  const onSaveWorkbook = () => {
    createWorkbook(wb!);
  }

  return <div className='flex gap-6'>

    <div className='flex flex-col gap-4 basis-2/5 p-4 sm:p-6 xl:p-8 items-stretch'>

      <CreateWorkbookForm onPreviewWorkbook={onPreviewWorkbook} className='w-full' />
      { wb && <FormButton type="button" onClick={onSaveWorkbook}>Save workbook</FormButton>}
    </div>
    {!!curr && <div className='basis-3/5 xl:pr-40 p-2 sm:p-4 xl:p-6'>
      <PageControls currentPage={currentPage} totalPages={worksheets.length} setPage={setCurrentPage} />
      <div className='bg-white border border-gray-300 drop-shadow-lg'>
        <WorksheetPage uworksheet={curr} onSave={resolved} />
      </div>
    </div>
    }

  </div>;
};



export default CreateWorksheetPage;

