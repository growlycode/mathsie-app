import { PropsWithChildren } from "react";
import { noop } from "../../../infrastructure/util/noop";

export interface FormButtonProps extends PropsWithChildren {
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
}

export const FormButton = ({ type = "submit", onClick, children }: FormButtonProps) => {

    return <button type={type} 
    onClick={() => onClick ? onClick() : noop()}
    className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >{children}</button>
}