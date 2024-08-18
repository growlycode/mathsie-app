export const prependStyle = (className: string | null | undefined) => {
    return className ? className + ' ' : '';
}

export const appendStyle = (className: string | null | undefined) => {
    return className ? ' ' + className : '';
}

export const appendErrorStyle = (err: any) => {
    return err ? ' !ring-2 !ring-red-500 border-red-500' : '';
}


export const prependErrorStyle = (err: any) => {
    return err ? '!ring-2 !ring-red-500 ' : '';
}
