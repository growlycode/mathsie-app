import { FieldError, Merge } from "react-hook-form";

export const prependStyle = (className: string | null | undefined) => {
    return className ? className + ' ' : '';
}

export const appendStyle = (className: string | null | undefined) => {
    return className ? ' ' + className : '';
}

export const appendErrorStyle = (err: FieldError | Merge<FieldError, (FieldError | undefined)[]> | undefined) => {
    return !!err?.message ? ' !ring-1 !ring-red-500 !border-red-500' : '';
}


export const prependErrorStyle = (err: any) => {
    return err ? '!ring-2 !ring-red-500 ' : '';
}
