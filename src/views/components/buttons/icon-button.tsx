import { PropsWithChildren } from "react"
import { prependStyle } from "../../../infrastructure/util/css"

export const IconButton = ({ faClass, text, onClick }: { faClass: string, text?: string, onClick: () => void }) => {

    return <Button className="gap-2" onClick={onClick}>
        <i className={`fa fa-${faClass} fa-fw`} />
        {text && <div className="font-medium text-sm">{text}</div>}
    </Button>
}

interface ButtonProps extends PropsWithChildren {
    className?: string,
    onClick: () => void
}

export const Button = ({ className, children, onClick }: ButtonProps) => {

    return <button type="button" onClick={onClick} className={`${prependStyle(className)}flex justify-center items-center p-4 rounded-lg bg-gray-200 border-none hover:bg-red-400`}>
        {children}
    </button>
}