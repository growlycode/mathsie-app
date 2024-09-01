import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useLoadingValue from './useLoadingValue';

export interface AuthStateHook {
    isLoggedIn: boolean;
    user: User | null | undefined;
    loading: boolean;
    isMarker: boolean;
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
    const [isMarker, setIsMarker] = useState<boolean>(false);



    useEffect(() => {


        const getIsMarker = async (user: User | null): Promise<boolean> => {
            
            if (!user) return false;

            const token = await user?.getIdTokenResult();
            if (!token) return false;
            
            const isMarker = token.claims.role == "marker";

            
            console.log(''+isMarker);
            return isMarker;
        }

        const listener = onAuthStateChanged(
            auth,
            async (user) => {
                if (!user) {
                    setIsMarker(false);
                }


                if (options?.onUserChanged) {
                    // onUserChanged function to process custom claims on any other trigger function
                    try {
                        await options.onUserChanged(user);

                    } catch (e) {
                        setError(e as Error);
                    }
                } 
                setValue(user);
                setIsMarker(await getIsMarker(user));
            },
            setError
        );

        return () => {
            listener();
        };
    }, [auth]);



    return { user: value, isLoggedIn: !!value, loading, error, isMarker };
};