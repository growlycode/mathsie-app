import { Label } from "flowbite-react";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Control, FieldErrors, FieldPath, FieldValues, RegisterOptions, UseFormRegister, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { appendErrorStyle, appendStyle } from "../../../infrastructure/util/css";

export interface ValidationProps<TFieldValues extends FieldValues> {
    register: UseFormRegister<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    control?: Control<TFieldValues>;
    watch?: UseFormWatch<TFieldValues>;
    rules?: RegisterOptions<TFieldValues>;
    trigger?: UseFormTrigger<TFieldValues>;
}

export interface FieldValidationProps<TFieldValues extends FieldValues> extends ValidationProps<TFieldValues> {
    field: FieldPath<TFieldValues>;
}

export interface MFieldProps {
    type?: HTMLInputTypeAttribute | undefined;
    label?: string;
    className?: string;
    disabled?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface FormFieldProps<TFieldValues extends FieldValues> extends FieldValidationProps<TFieldValues>, MFieldProps {
};



export interface MInputProps extends MFieldProps {
    placeholder?: string;
    autoComplete?: string
    pattern?: string;
    extraProps?: any;
}

export interface FormInputProps<TFieldValues extends FieldValues> extends FormFieldProps<TFieldValues>, MInputProps {
}

export function FormInput<TFieldValues extends FieldValues>({ register, className, errors = {},
    field, placeholder, autoComplete, label, rules = {}, type, pattern, disabled, onChange }: FormInputProps<TFieldValues>) {
    return <div>

        {label && <Label htmlFor={field} className="whitespace-nowrap">{label}</Label>}
        <div className="mt-2">
            <input type={type} {...register(field, rules)} autoComplete={autoComplete}
                placeholder={placeholder}
                pattern={pattern}
                disabled={disabled}
                onChange={(e) => onChange && onChange(e)}
                className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm${appendStyle(className)}${appendErrorStyle(errors[field])}`} />
        </div>
    </div>;
}

export function MInput({ name, label, type, autoComplete, placeholder, pattern, className, extraProps, onChange }: MInputProps & { name: string }) {

    return <div>

        {label && <Label htmlFor={name} className="whitespace-nowrap">{label}</Label>}
        <div className="mt-2">
            <input type={type}
                name={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
                pattern={pattern}
                onChange={(e) => onChange && onChange(e)}
                { ...(extraProps || {}) }
                className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm${appendStyle(className)}`} />
        </div>
    </div>
}
