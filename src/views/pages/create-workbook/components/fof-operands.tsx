import { NewWorksheetProps } from "../../../../core/operations";
import { FormInput, ValidationProps } from "../../../components/form/input";

interface FamilyOfFactsOperationOperands extends ValidationProps<NewWorksheetProps> { }

export const FamilyOfFactsOperationOperands = ({ control, register, errors, watch }: ValidationProps<NewWorksheetProps>) => {

    const left = watch!('leftOperand');
    const right = watch!('rightOperand');
    const hasOp = (num: string) => {
        return !!num?.trim()?.length && !isNaN(Number(num));
    }

    return <div className="flex justify-evenly gap-4 items-end">
        <div>
            <FormInput
                type="text"
                label='Operands'
                field="leftOperand"
                control={control}
                register={register}
                errors={errors}
                placeholder="e.g. 3"
            />
        </div>
        <div className="leading-10 h-10">+</div>
        <div>
            <FormInput
                type="text"
                label='&nbsp;'
                field="rightOperand"
                control={control}
                register={register}
                errors={errors}
                placeholder="e.g. 5"
            />
        </div>
        <div className="leading-10 h-10">=</div>
        <div className="leading-10 h-10 w-10 text-center">{hasOp(left) && hasOp(right) ? Number(left) + Number(right) : ''}</div>
    </div >;
}