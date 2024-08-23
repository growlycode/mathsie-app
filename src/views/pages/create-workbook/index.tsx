import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/form/input';
import { CbGroup } from '../../components/form/checkbox-group';
import { ButtonGroup } from '../../components/buttons/button-group';
import { HiAdjustments, HiOutlineFilter } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { FormButton } from '../../components/buttons/form-button';
import { ValidationError } from '../../components/form/validation-error';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { allOperations, NewWorksheetProps } from '../../../core/operations';

export const operationTypes = [
  { value: 'basic', label: 'Basic', icon: HiOutlineFilter },
  { value: 'family', label: 'Family of facts', icon: HiAdjustments }
];

const reqError = { message: 'Required' };
const schema: z.ZodType<NewWorksheetProps> = z.object({
  numSheets: z.number().int().min(1, { message: 'At least one sheet required.' }).max(100),
  numEquationsPerSheet: z.number().int().min(1, { message: 'At least one equation per sheet.' }).max(20),
  leftOperand: z.string().min(1, reqError),
  rightOperand: z.string().min(1, reqError),
  operations: z.string().array().nonempty(reqError),
});

const CreateWorksheetPage = () => {

  const [operationType, setOperationType] = useState<string>('basic');
  const { register, control, handleSubmit, resetField, formState: { errors } } = useForm<NewWorksheetProps>({
    defaultValues: { numEquationsPerSheet: 15, numSheets: 10, operations: [] },
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    resetField('operations');
  }, [operationType])

  const onSubmit = (data: NewWorksheetProps) => {
    // Handle form submission here
    console.log(data);
  };

  return (<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 md:w-1/2 xl:w-1/4 '>
    <div className='flex gap-4 justify-evenly'>
      <div
        className='w-full'>
        <FormInput
          type="number"
          label='Number of sheets'
          field="numSheets"
          register={register}
          errors={errors}
          rules={{ valueAsNumber: true }}
          placeholder='10'
          className='w-full'
        />
        <ValidationError error={errors.numSheets} />
      </div>
      <div className='w-full'>
        <FormInput
          type="number"
          label='Equations per sheet'
          field="numEquationsPerSheet"
          register={register}
          rules={{ valueAsNumber: true }}
          errors={errors}
          placeholder='15'
          className='w-full'
        />
        <ValidationError error={errors.numEquationsPerSheet} />
      </div>
    </div>

    <div className=''>
      <FormInput
        type="text"
        label='Left operands'
        field="leftOperand"
        register={register}
        errors={errors}
        placeholder="1-2, 3, 4, etc"
      />
      <ValidationError error={errors.leftOperand} />
    </div>

    <div className=''>
      <FormInput
        type="text"
        label='Right operands'
        field="rightOperand"
        register={register}
        errors={errors}
        placeholder="1-2, 3, 4, etc"
      />
      <ValidationError error={errors.rightOperand} />
    </div>

    <div className=''>
      <ButtonGroup selected={operationType} label='Operation type(s)'
        fields={operationTypes} onSelected={setOperationType}
        className="pb-2">
      </ButtonGroup>

      {operationType == 'basic'
        ? <CbGroup control={control} field={'operations'}
          fields={allOperations.basic.operations.map(op => ({ value: op.id, label: op.label }))}>
          <ValidationError error={errors.operations} />
        </CbGroup>
        : <CbGroup control={control} field={'operations'}
          fields={allOperations.family.operations.map(op => ({ value: op.id, label: op.label }))}>
          <ValidationError error={errors.operations} />
        </CbGroup>
      }
    </div>

    <FormButton>Create workbook</FormButton>
  </form>
  );
};

export default CreateWorksheetPage;

