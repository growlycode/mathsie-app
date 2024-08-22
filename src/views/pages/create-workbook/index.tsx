import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/form/input';
import { CbGroup } from '../../components/form/checkbox';
import { ButtonGroup } from '../../components/buttons/button-group';
import { HiAdjustments, HiOutlineFilter } from 'react-icons/hi';
import { useState } from 'react';
import { FormButton } from '../../components/buttons/form-button';
import { ValidationError } from '../../components/form/validation-error';


interface NewWorksheetProps {
  leftOperand: string;
  rightOperand: string;
  operations: string[];
  numSheets: number;
  numEquationsPerSheet: number;
}

interface BasicOperation {
  id: string;
  symbol: string;
  label: string;
  func: (a: number, b: number) => number;
}

const allOperations =
{
  basic: {
    operations: [
      {
        id: 'add',
        symbol: '+',
        label: 'Addition',
        func: (a: number, b: number) => a + b
      },
      {
        id: 'sub',
        symbol: '-',
        label: 'Subtraction',
        func: (a: number, b: number) => a - b
      },
      {
        id: 'mult',
        symbol: '*',
        label: 'Multiplication',
        func: (a: number, b: number) => a * b
      }
    ] as BasicOperation[],
  },
  family: {
    operations: [
      {
        id: 'add',
        symbol: '+',
        label: 'Addition',
        func: (a: number, b: number) => a + b
      },
      {
        id: 'sub',
        symbol: '-',
        label: 'Subtraction',
        func: (a: number, b: number) => a - b
      }
    ] as BasicOperation[]
  }
};

const operationTypes = [
  { value: 'basic', label: 'Basic', icon: HiOutlineFilter },
  { value: 'family', label: 'Family of facts', icon: HiAdjustments }
];

const CreateWorksheetPage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<NewWorksheetProps>({
    defaultValues: {
      numEquationsPerSheet: 15,
      numSheets: 10
    }
  });

  const [operationType, setOperationType] = useState<string>('basic');

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
          rules={{ required: 'Required', valueAsNumber: true }}
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
          errors={errors}
          rules={{ required: 'Required', valueAsNumber: true }}
          placeholder='15'
          className='w-full'
        />
        <ValidationError error={errors.numEquationsPerSheet} />
      </div>
    </div>

    <div className=''>
      <FormInput
        type="text"
        label='Left operand'
        field="leftOperand"
        register={register}
        errors={errors}
        rules={{ required: 'Required' }}
        placeholder="1-2, 3, 4, etc"
      />
      <ValidationError error={errors.leftOperand} />
    </div>

    <div className=''>
      <FormInput
        type="text"
        label='Right operand'
        field="rightOperand"
        register={register}
        errors={errors}
        rules={{ required: 'Required' }}
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

