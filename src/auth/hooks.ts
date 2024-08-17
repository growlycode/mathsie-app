import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import useLoadingValue from './useLoadingValue';

export interface AuthStateHook {
    isLoggedIn: boolean;
    user: User | null | undefined;
    loading: boolean;
    error: Error | undefined;
};

type AuthStateOptions = {
    onUserChanged?: (user: User | null) => Promise<void>;
};

export const useAuth = (auth: Auth, options?: AuthStateOptions): AuthStateHook => {
    const { error, loading, setError, setValue, value } = useLoadingValue<
        User | null,
        Error
    >(() => auth.currentUser);

    useEffect(() => {
        const listener = onAuthStateChanged(
            auth,
            async (user) => {
                if (options?.onUserChanged) {
                    // onUserChanged function to process custom claims on any other trigger function
                    try {
                        await options.onUserChanged(user);
                    } catch (e) {
                        setError(e as Error);
                    }
                }
                setValue(user);
            },
            setError
        );

        return () => {
            listener();
        };
    }, [auth]);

    return { user: value, isLoggedIn: !!value, loading, error };
};