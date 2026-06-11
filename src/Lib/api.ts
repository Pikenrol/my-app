const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const API_ENDPOINTS = {
    authRegister: `${API_BASE_URL}/auth/register`,
    authLogin: `${API_BASE_URL}/auth/login`,
    authRefresh: `${API_BASE_URL}/auth/refresh`,
    authMe: `${API_BASE_URL}/auth/me`,
    users: `${API_BASE_URL}/users`,
    calendarEvents: "http://localhost:3001/calendarEvents",
};
