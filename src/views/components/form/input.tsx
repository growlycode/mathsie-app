import { Label } from "flowbite-react";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Control, FieldErrors, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { appendErrorStyle, appendStyle } from "../../../infrastructure/util/css";

export interface FormFieldProps<TFieldValues extends FieldValues> {
    register: UseFormRegister<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    field: FieldPath<TFieldValues>;
    label?: string;
    rules?: RegisterOptions<TFieldValues>;
    type?: HTMLInputTypeAttribute | undefined;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    control?: Control<TFieldValues>;
};

export interface FormInputProps<TFieldValues extends FieldValues> extends FormFieldProps<TFieldValues> {

    placeholder?: string;
    autoComplete?: string
    pattern?: string;
}

export function FormInput<TFieldValues extends FieldValues>({ register, className, errors = {}, 
    field, placeholder, autoComplete, label, rules = {}, type, pattern, onChange }: FormInputProps<TFieldValues>) {
    return <div>

        { label && <Label htmlFor={field} className="whitespace-nowrap">{label}</Label> }
        <div className="mt-2">
            <input type={type} {...register(field, rules)} autoComplete={autoComplete} 
            placeholder={placeholder}
            pattern={pattern}
            onChange={(e) => onChange && onChange(e)}
            className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm${appendStyle(className)}${appendErrorStyle(errors[field])}`} />
        </div>
    </div>;
}
