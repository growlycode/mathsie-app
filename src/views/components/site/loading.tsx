
export const SubtleLoader = () => {
    return <div className={`flex h-full w-full items-center justify-center flex-wrap`}>...</div>
}

export const AppLoading = ({ text = 'Loading mathsie' }: { text?: string }) => {

    return (<div className={`flex h-full w-full items-center justify-center flex-wrap flex-col`}>
        <svg className="animate-bounce w-40 h-40 ...">
            <svg className="w-40 h-40 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
        </svg>
        {text && <div className="font-medium uppercase text-lg">{text}</div>}
    </div>);

}
