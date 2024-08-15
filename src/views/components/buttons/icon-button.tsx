import { PropsWithChildren } from "react"
import { prependStyle } from "../../../util/css"

export const IconButton = ({ faClass, onClick }: { faClass: string, onClick: () => void }) => {

    return <Button onClick={onClick}>
        <i className={`fa fa-${faClass} fa-fw`} />
    </Button>
}

interface ButtonProps extends PropsWithChildren {
    className?: string,
    onClick: () => void
}

export const Button = ({ className, children, onClick }: ButtonProps) => {

    return <button type="button" onClick={onClick} className={`${prependStyle(className)}flex justify-center align-center p-4 rounded-lg bg-gray-200 border-none hover:bg-green-300`}>
        {children}
    </button>
}