import { Button } from "flowbite-react";
import { IconType } from "react-icons";
import { FormSubField } from "../form/checkbox";

export interface ButtonGroupProps {
    label?: string;
    fields: ButtonGroupField[];
    selected: string;
    onSelected: (mode: string) => void;
    className?: string;
}

export interface ButtonGroupField extends FormSubField {
    icon: IconType;
}

export const ButtonGroup = ({ className, label, selected, onSelected, fields }: ButtonGroupProps) => {

    return <div className={className || ''}>
        {label && <div className="mb-2">{label}</div>}
        <Button.Group>
            {fields.map(f => (<Button key={`b${f.value}`} color='gray' className={`${ selected === f.value ? ' !bg-primary-700 !text-white': ''}`} onClick={() => onSelected(f.value)}>
                <f.icon className="mr-3 h-4 w-4" />
                {f.label}
            </Button>
            ))}
        </Button.Group>
    </div>

}