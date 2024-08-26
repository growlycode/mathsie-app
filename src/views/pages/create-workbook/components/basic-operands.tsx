import { NewWorksheetProps } from "../../../../core/operations";
import { FormInput, ValidationProps } from "../../../components/form/input";
import { ValidationError } from "../../../components/form/validation-error";

export const BasicOperationOperands = ({ control, register, errors }: ValidationProps<NewWorksheetProps>) => {

    return <>
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
            <ValidationError error={errors?.leftOperand} />
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
            <ValidationError error={errors?.rightOperand} />
        </div>
    </>;
}