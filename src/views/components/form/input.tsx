import { HTMLInputTypeAttribute } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface FormFieldProps {
    register: UseFormRegister<any>; 
    field: string; 
    label: string;
    rules?: RegisterOptions;
    type?:  HTMLInputTypeAttribute | undefined;
};

export interface FormInputProps extends FormFieldProps {

    autoComplete?: string
}

export const FormInput = ({register, field, autoComplete, label, rules = {}, type }: FormInputProps) => {
    return <div>
        <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
            <input type={type} {...register(field, rules)} autoComplete={autoComplete} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
    </div>;
}