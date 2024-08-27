import { PropsWithChildren } from "react";
import { FieldValues, Control, FieldPath, RegisterOptions, Controller } from "react-hook-form";
import { appendStyle, appendErrorStyle } from "../../../infrastructure/util/css";

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
        render={({ field, fieldState: { error } }) => {

            const onChange = (val: string, checked: boolean) => {
                let vals = field.value ? [...field.value] : [];
                if (!checked) vals = vals.filter(v => v !== val);
                else vals.push(val);
                field.onChange(vals);
            }

            return <div className={`border p-4${appendStyle(className)}${appendErrorStyle(error, 'pb-2 pr-2.5')}`}>
                {label && <div>{label}</div>}
                <div className='flex flex-col gap-2'>
                    {fields.map((f: FormSubField, idx: number) => (
                        <label key={`${field}${idx}`} className={`flex items-center gap-2`}>
                            <input
                                type="checkbox"
                                value={f.value}
                                checked={!!(field.value as string[]).find(fv => fv === f.value)}
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