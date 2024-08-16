import { appendStyle } from "../../../infrastructure/util/css";
import { ErrorDisplay } from "./error-display";
import { SubtleLoader } from "./loading";

export interface DataLoadingPlaceholderProps  {
    title: string;
    emptyMessage: string;
    className?: string;
    isLoading: boolean;
    hasError: boolean;
    hasData: boolean;
    children: () => React.ReactNode;
}

export const DataLoading = ({ title, hasError, emptyMessage, isLoading, hasData, className, children }: DataLoadingPlaceholderProps) => {

    const errorDisplayMessage = title ? `Failed to load ${title}...` : 'Failed to load...';

    return (
        <div className={`data-loading${appendStyle(className)} h-full`}>
            {hasError
                ? <ErrorDisplay message={errorDisplayMessage} />
                : isLoading
                    ? <SubtleLoader />
                    : hasData
                        ? children()
                        : <div>{emptyMessage || 'No data'}</div>
            }
        </div>);
}
