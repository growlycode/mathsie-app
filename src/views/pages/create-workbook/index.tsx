
import { useEffect, useState } from 'react';
import { CreateWorkbookForm } from './components/create-workbook-form';
import { NewUserWorkbook, NewWorkbook, UserWorksheet } from '../../../core/workbook';
import { WorksheetPage } from '../../components/worksheet/worksheet';
import { resolved } from '../../../infrastructure/util/noop';
import { PageControls } from '../../components/worksheet/page-controls';
import { FormButton } from '../../components/buttons/form-button';
import useWorkbookStore from '../../../store/workbookStore';
import { Label, Select } from 'flowbite-react';
import { User } from '../../../core/user';




const CreateWorksheetPage = () => {

  const [worksheets, setWorksheets] = useState<UserWorksheet[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [student, setStudent] = useState<User | undefined>();
  const { createWorkbook, fetchStudents, students } = useWorkbookStore();


  useEffect(() => {
    fetchStudents();
  }, []);

  const onStudentSelected = (userId: string) => {
    const s = students.find(s => s.id === userId);
    setStudent(s);
  }

  const onPreviewWorkbook = (wb: NewWorkbook) => {
    setWorksheets(wb.worksheets.map(ws => ({ equations: ws.equations, id: '', paths: [] })));
  }

  const onSaveWorkbook = () => {
    const wb: NewUserWorkbook = { user: student!, worksheets: worksheets!, title: '' };
    createWorkbook(wb);
  }

  return <div className='flex gap-6'>

    <div className='flex flex-col gap-4 basis-2/5 p-4 sm:p-6 xl:p-8 items-stretch'>
      <Label htmlFor={'students'} className="whitespace-nowrap">Assign to:</Label>

      <Select id='students' className='pb-4' onChange={e => onStudentSelected(e.currentTarget.value)}>
        <option value=""></option>
        {students?.length && students.map(s => (<option value={s.id} key={`s${s.id}`}>{s.givenName} {s.familyName} </option>))}

      </Select>
      <CreateWorkbookForm onPreviewWorkbook={onPreviewWorkbook} className='w-full' />
      <FormButton type="button" onClick={onSaveWorkbook}>Save workbook</FormButton>
    </div>
    {worksheets?.length && <div className='basis-3/5 xl:pr-40 p-2 sm:p-4 xl:p-6'>
      <PageControls currentPage={currentPage} totalPages={worksheets?.length} setPage={setCurrentPage} />
      <div className='bg-white border border-gray-300 drop-shadow-lg'>
        <WorksheetPage uworksheet={worksheets[currentPage]} onSave={resolved} />
      </div>
    </div>
    }

  </div>;
};



export default CreateWorksheetPage;

