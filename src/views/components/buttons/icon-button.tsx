import { PropsWithChildren } from "react";
import { appendStyle } from "../../../infrastructure/util/css";

type ButtonTypes = "submit" | "reset" | "button" | undefined;

export const IconButton = ({ faClass, className, text, onClick }: { faClass: string, className?: string, text?: string, onClick: () => void }) => {

    return <Button className={`gap-2${appendStyle(className)}`} onClick={onClick}>
        <i className={`fa fa-${faClass} fa-fw`} />
        {text && <div className="font-medium text-sm">{text}</div>}
    </Button>
}

interface ButtonProps extends PropsWithChildren {
    className?: string,
    type?: ButtonTypes;
    onClick: () => void
}

export const Button = ({ type = "button", className, children, onClick }: ButtonProps) => {

    return <button type={type} onClick={onClick} className={`flex justify-center items-center p-4 rounded-lg bg-gray-200 border-none dark:bg-red-600 hover:bg-red-400${appendStyle(className)}`}>
        {children}
    </button>
}

{/* <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button> */}