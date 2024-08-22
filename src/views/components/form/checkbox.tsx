import { PropsWithChildren } from "react";
import { appendErrorStyle, appendStyle } from "../../../infrastructure/util/css";
import { FormFieldProps } from "./input";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

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

export interface FormSubField { value: string, label: string }

export interface FormCbGroupProps<TFieldValues extends FieldValues> extends PropsWithChildren {
    control: Control<TFieldValues>;
    fields: FormSubField[];
    field: FieldPath<TFieldValues>;
    label?: string;
    rules?: RegisterOptions<TFieldValues>;
    className?: string;
}

export function CbGroup<TFieldValues extends FieldValues>({ label, field, children, fields, control, rules, className }: FormCbGroupProps<TFieldValues>) {

    
    return <Controller
        name={field}
        control={control}
        rules={rules}
        render={({ field, fieldState: {error} }) => {


            const onChange = (val: string, checked: boolean) => {
                const vals = field.value ? [...field.value] : [];
                if (checked) field.onChange(vals.filter(v => v === val));
                else {
                    vals.push(val);
                    field.onChange(vals);
                }
            } 

            return <div className={`${appendStyle(className)}${appendErrorStyle(error)}`}>
                {label && <div>{label}</div>}
                <div className='flex flex-col gap-2 mt-2'>
                    {fields.map((f: FormSubField, idx: number) => (
                        <label key={`${field}${idx}`} className={`flex items-center gap-2${appendStyle(className)}`}>
                            <input
                            
                                type="checkbox"
                                value={f.value}
                                onChange={val => onChange(f.value, val.currentTarget.checked)}
                            />{f.label}</label>
                    ))}
                </div>
                {children}
            </div>
        }
        }
    />
}