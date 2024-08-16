
export const ErrorDisplay = ({ message }: { message?: string }) => {
    return (
        <div className="error-display flex flex-col items-center h-full w-full justify-center">
            <div><i className="fa fa-circle-exclamation basis-1/2 text-9xl" /></div>
            <div>{message || 'Failed to load'}</div>
        </div>
    );
}
