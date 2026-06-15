import { useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi } from "../../Api/authApi";
import { tokenStorage } from "../../Lib/tokenStorage";
import type { MeResponse } from "../../types";
import { AuthContext, type AuthContextValue } from "./AuthContext";

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<MeResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const signOut = (): void => {
        tokenStorage.clearTokens();
        setUser(null);
    };

    const signIn = async (email: string, password: string): Promise<void> => {
        try {
            console.log('Attempting login with email:', email);
            const tokens = await authApi.login({ email, password });
            console.log('Login successful, tokens received:', tokens);
            tokenStorage.setAccessToken(tokens.accessToken);
            tokenStorage.setRefreshToken(tokens.refreshToken);
            const currentUser = await authApi.me(tokens.accessToken);
            setUser(currentUser);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    useEffect(() => {
        const bootstrap = async (): Promise<void> => {
            const accessToken = tokenStorage.getAccessToken();
            const refreshToken = tokenStorage.getRefreshToken();

            if (!accessToken) {
                setIsLoading(false);
                return;
            }

            try {
                const currentUser = await authApi.me(accessToken);
                setUser(currentUser);
            } catch {
                if (!refreshToken) {
                    signOut();
                    setIsLoading(false);
                    return;
                }

                try {
                    const refreshed = await authApi.refresh({ refreshToken });
                    tokenStorage.setAccessToken(refreshed.accessToken);
                    const currentUser = await authApi.me(refreshed.accessToken);
                    setUser(currentUser);
                } catch {
                    signOut();
                }
            } finally {
                setIsLoading(false);
            }
        };

        void bootstrap();
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            signIn,
            signOut,
        }),
        [user, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
