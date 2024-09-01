import { FieldValues, Controller } from "react-hook-form";
import { appendStyle } from "../../../infrastructure/util/css";
import { FormFieldProps } from "./input";
import { Select } from "flowbite-react";

export interface FormSelectProps<TFieldValues extends FieldValues> extends FormFieldProps<TFieldValues> {
    appendBlank?: boolean;
    options: { id: string, value: string, data: { id: string } }[];
}

export function Sel<TFieldValues extends FieldValues>({ options, appendBlank, label, field, control, rules, className }: FormSelectProps<TFieldValues>) {


    return <Controller
        name={field}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {

            const onChange = (val: string) => {
                const selected = options.find(o => o.id === val);
                field.onChange(selected?.data);
            }

            const getVal = () => {
                return field.value?.id || '';
            }

            return <div className={`sel-wrapper${appendStyle(className)}`}>
                {label && <div>{label}</div>}
                <Select

                    className={`select-field mt-2${appendStyle(error ? 'invalid' : '')}`}
                    value={getVal()}
                    onChange={e => onChange(e.currentTarget.value)}>
                    {appendBlank && <option value=""></option>}
                    {options?.length && options.map(s => (<option value={s.id} key={`s${s.id}`}>{s.value}</option>))}
                </Select>
            </div>

        }}
    />
}