import dateFormatter from "../dates/dateFormatter";
import { TimeRangeProps } from "../dates/time-range";

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

export const addTimeRange = (params: URLSearchParams, timeRange: TimeRangeProps | null | undefined): void => {
    timeRange?.from && addParamsIfSpecified(params, 'from', dateFormatter.toDateString(timeRange.from));
    timeRange?.to && addParamsIfSpecified(params, 'to', dateFormatter.toDateString(timeRange.to));
};
export const addFrom = (params: URLSearchParams, from?: Date | null): void => {
    from && addParamsIfSpecified(params, 'from', dateFormatter.toDateString(from));
};
export const addTo = (params: URLSearchParams, to?: Date | null): void => {
    to && addParamsIfSpecified(params, 'to', dateFormatter.toDateString(to));
};
