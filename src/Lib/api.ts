const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_PROXY_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : API_BASE_URL;

export const API_ENDPOINTS = {
    authRegister: `${API_PROXY_BASE_URL}/auth/register`,
    authLogin: `${API_PROXY_BASE_URL}/auth/login`,
    authRefresh: `${API_PROXY_BASE_URL}/auth/refresh`,
    authMe: `${API_PROXY_BASE_URL}/auth/me`,
    users: `${API_PROXY_BASE_URL}/users`,
    calendarEvents: "http://localhost:3001/calendarEvents",
};
