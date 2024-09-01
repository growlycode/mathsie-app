import { DeepRequired, FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";

export const prependStyle = (className: string | null | undefined) => {
    return className ? className + ' ' : '';
}

export const appendStyle = (className: string | null | undefined) => {
    return className ? ' ' + className : '';
}

export const appendErrorStyle = <TFieldValues extends FieldValues>(err: FieldError | Merge<FieldError, FieldErrorsImpl<DeepRequired<TFieldValues>[string]>> | undefined, extrasIfInvalid?: string) => {
    return !!err?.message ? ' !ring-2 !ring-red-500 !border-red-500'+ (extrasIfInvalid ? ' ' + extrasIfInvalid : '') : '';
}


export const prependErrorStyle = (err: any) => {
    return err ? '!ring-2 !ring-red-500 ' : '';
}
