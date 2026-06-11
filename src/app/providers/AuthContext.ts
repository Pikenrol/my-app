import { createContext } from "react";
import type { MeResponse } from "../../types";

export type AuthContextValue = {
    user: MeResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
