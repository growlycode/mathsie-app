import { appendStyle } from "../../../infrastructure/util/css";
import { FormFieldProps } from "./input";
import { FieldValues } from "react-hook-form";

export interface FormCbProps<TFieldValues extends FieldValues> extends FormFieldProps<TFieldValues> {
    value: string;
}

export function Cb<TFieldValues extends FieldValues>({ label, field, rules, value, register, className }: FormCbProps<TFieldValues>) {

    return <label className={`flex items-center gap-2${appendStyle(className)}`}><input
        type="checkbox"
        {...register(field, rules)}
        value={value}
    />{label}</label>
}
