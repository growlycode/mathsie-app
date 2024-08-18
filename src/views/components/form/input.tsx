import { Label } from "flowbite-react";
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { appendErrorStyle } from "../../../infrastructure/util/css";

export interface FormFieldProps {
    register: UseFormRegister<any>;
    errors?: FieldErrors<any>;
    field: string;
    label: string;
    rules?: RegisterOptions;
    type?: HTMLInputTypeAttribute | undefined;
};

export interface FormInputProps extends FormFieldProps {

    autoComplete?: string
}

export const FormInput = ({ register, errors = {}, field, autoComplete, label, rules = {}, type }: FormInputProps) => {
    return <div>

        <Label htmlFor={field}>{label}</Label>
        <div className="mt-2">
            <input type={type} {...register(field, rules)} autoComplete={autoComplete} className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm${appendErrorStyle(errors[field])}`} />
        </div>
    </div>;
}