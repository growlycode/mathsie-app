import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/form/input';
import { CbGroup } from '../../components/form/checkbox-group';
import { ButtonGroup } from '../../components/buttons/button-group';
import { HiAdjustments, HiOutlineFilter } from 'react-icons/hi';
import { useEffect, useMemo } from 'react';
import { FormButton } from '../../components/buttons/form-button';
import { ValidationError } from '../../components/form/validation-error';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { allOperations, createWorkbook, NewWorksheetProps, parseOperands } from '../../../core/operations';

export const operationTypes = [
  { value: 'basic', label: 'Basic', icon: HiOutlineFilter },
  { value: 'family', label: 'Family of facts', icon: HiAdjustments }
];

const reqError = { message: 'Required' };
const operandError = { message: 'Invalid range' };
const operand = (numStr: string): boolean => {
  try {
    parseOperands(numStr);
  } catch (err) {
    return false;
  }
  return true;

}
const schema: z.ZodType<NewWorksheetProps> = z.object({
  numSheets: z.number().int().min(1, { message: 'At least one sheet required.' }).max(100),
  numEquationsPerSheet: z.number().int().min(1, { message: 'At least one equation per sheet.' }).max(20),
  leftOperand: z.string().min(1, reqError).refine(operand, operandError),
  rightOperand: z.string().min(1, reqError).refine(operand, operandError),
  operations: z.string().array().nonempty(reqError),
  operationType: z.string().min(1, reqError)
});

const CreateWorksheetPage = () => {

  const { register, control, watch, setValue, handleSubmit, resetField, formState: { errors } } = useForm<NewWorksheetProps>({
    defaultValues: { numEquationsPerSheet: 15, numSheets: 10, operations: [], operationType: 'basic' },
    resolver: zodResolver(schema)
  });
  const operationType = watch('operationType');

  useEffect(() => {
    resetField('operations');
  }, [operationType])

  const onSubmit = (data: NewWorksheetProps) => {
    const wb = createWorkbook(data);
    console.log(wb);
  };

  const ops = useMemo(() => allOperations[operationType].operations.map(op => ({ value: op.id, label: op.label })), [operationType]);

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

    <div>
      <FormInput
        type="text"
        label='Left operands'
        field="leftOperand"
        control={control}
        register={register}
        errors={errors}
        placeholder="1-2, 3, 4 etc"
      />
      <ValidationError error={errors.leftOperand} />
    </div>

    <div>
      <FormInput
        type="text"
        label='Right operands'
        field="rightOperand"
        control={control}
        register={register}
        errors={errors}
        placeholder="1-2, 3, 4 etc"
      />
      <ValidationError error={errors.rightOperand} />
    </div>

    <div>
      <ButtonGroup selected={operationType} label='Operation type(s)'
        fields={operationTypes} onSelected={mode => setValue('operationType', mode)}
        className="pb-2">
      </ButtonGroup>

      <CbGroup control={control} field={'operations'}
        fields={ops}>
        <ValidationError error={errors.operations} />
      </CbGroup>
    </div>

    <FormButton>Create workbook</FormButton>
  </form>
  );
};

export default CreateWorksheetPage;

