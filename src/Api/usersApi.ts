import { API_ENDPOINTS } from "../Lib/api";
import type { ApiUser } from "../types";

export const usersApi = {
    async getUsers(accessToken: string): Promise<ApiUser[]> {
        const response = await fetch(API_ENDPOINTS.users, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) throw new Error("Не удалось загрузить пользователей");
        return response.json() as Promise<ApiUser[]>;
    },
};
