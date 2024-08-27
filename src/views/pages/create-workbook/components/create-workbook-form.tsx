import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { NewWorksheetProps, allOperations, createWorkbook, parseOperands } from "../../../../core/operations";
import { FormButton } from "../../../components/buttons/form-button";
import { CbGroup } from "../../../components/form/checkbox-group";
import { FormInput } from "../../../components/form/input";
import { ValidationError } from "../../../components/form/validation-error";
import { BasicOperationOperands } from "./basic-operands";
import { FamilyOfFactsOperationOperands } from "./fof-operands";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HiOutlineFilter, HiAdjustments } from "react-icons/hi";
import { ButtonGroup } from "../../../components/buttons/button-group";
import { NewWorkbook } from "../../../../core/workbook";
import { appendStyle } from "../../../../infrastructure/util/css";

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



export const operationTypes = [
    { value: 'basic', label: 'Basic', icon: HiOutlineFilter },
    { value: 'family', label: 'Family of facts', icon: HiAdjustments }
];



const schema: z.ZodType<NewWorksheetProps> = z.object({
    numSheets: z.number().int().min(1, { message: 'At least one sheet required.' }).max(100),
    numEquationsPerSheet: z.number().int().min(1, { message: 'At least one equation per sheet.' }).max(20),
    leftOperand: z.string().min(1, reqError).refine(operand, operandError),
    rightOperand: z.string().min(1, reqError).refine(operand, operandError),
    operations: z.string().array().nonempty(reqError),
    operationType: z.string().min(1, reqError)
});

export const CreateWorkbookForm = ({ className, onPreviewWorkbook }: { className: string, onPreviewWorkbook: (wb: NewWorkbook) => void }) => {

    const { register, control, watch, setValue, handleSubmit, resetField, formState: { errors } } = useForm<NewWorksheetProps>({
        defaultValues: { numEquationsPerSheet: 15, numSheets: 10, operations: [], operationType: 'basic' },
        resolver: zodResolver(schema)
    });
    const operationType = watch('operationType');

    useEffect(() => {
        resetField('operations');
        resetField('leftOperand');
        resetField('rightOperand');
    }, [operationType])

    const onSubmit = (data: NewWorksheetProps) => {
        const wb = createWorkbook(data);
        onPreviewWorkbook(wb);
    };

    const ops = useMemo(() => allOperations[operationType].operations.map(op => ({ value: op.id, label: op.label })), [operationType]);

    return (<form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-6 ${appendStyle(className)}`}>
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
            <ButtonGroup selected={operationType} label='Operation type(s)'
                fields={operationTypes} onSelected={(mode: string) => setValue('operationType', mode)}
                className="pb-2">
            </ButtonGroup>

            <CbGroup control={control} field={'operations'} className="border-gray-300"
                fields={ops}>
                <ValidationError error={errors.operations} />
            </CbGroup>
        </div>

        {operationType === 'basic'
            ? <BasicOperationOperands register={register} control={control} errors={errors} />
            : <FamilyOfFactsOperationOperands register={register} control={control} errors={errors} watch={watch} />}


        <FormButton>Preview workbook</FormButton>
    </form>
    );
}