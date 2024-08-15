export const prependStyle = (className: string | null | undefined) => {
    return className ? className + ' ' : '';
}

export const appendStyle = (className: string | null | undefined) => {
    return className ? ' ' + className : '';
}