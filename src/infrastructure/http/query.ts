

export const addParamsIfSpecified = (params: URLSearchParams, tag: string, paramValue: any | undefined) => {

    if (Array.isArray(paramValue)) {
        if (!paramValue?.length) return params;
        paramValue.forEach((paramValue: any) => params.append(tag, paramValue));
    }
    else {
        if (paramValue) {
            params.append(tag, paramValue);
        }
    }
    return paramValue;
};
