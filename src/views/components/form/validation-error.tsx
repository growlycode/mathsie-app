import { FieldError, Merge } from "react-hook-form";

export const ValidationError = ({ error }: { error:  Merge<FieldError, (FieldError | undefined)[]> | undefined }) => {

    return error && <div className="text-right text-red-500 text-xs mt-1">{error?.message}</div>;
}