import { API_ENDPOINTS } from "../Lib/api";
import type {
    LoginRequest,
    LoginResponse,
    MeResponse,
    RefreshRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types";

export const authApi = {
    async login(payload: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(API_ENDPOINTS.authLogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Ошибка авторизации");
        return response.json() as Promise<LoginResponse>;
    },

    async register(payload: RegisterRequest): Promise<RegisterResponse> {
        const response = await fetch(API_ENDPOINTS.authRegister, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Ошибка регистрации");
        return response.json() as Promise<RegisterResponse>;
    },

    async refresh(payload: RefreshRequest): Promise<RefreshResponse> {
        const response = await fetch(API_ENDPOINTS.authRefresh, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Сессия истекла");
        return response.json() as Promise<RefreshResponse>;
    },

    async me(accessToken: string): Promise<MeResponse> {
        const response = await fetch(API_ENDPOINTS.authMe, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) throw new Error("Не удалось получить пользователя");
        return response.json() as Promise<MeResponse>;
    },
};
