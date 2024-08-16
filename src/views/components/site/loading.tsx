const AppLoading = ({ text }: { text?: string }) => {

    return (<div className={`flex`}>
        <svg className="animate-bounce w-6 h-6 ...">
            <svg className="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
        </svg>
        {text && <div>{text}</div>}
    </div>);

}

export default AppLoading;