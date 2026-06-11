export type Role = "ADMIN" | "MANAGER" | "VIEWER";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};

export type RefreshRequest = {
    refreshToken: string;
};

export type RefreshResponse = {
    accessToken: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
    fullName: string;
};

export type RegisterResponse = {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    createdAt: string;
};

export type MeResponse = {
    id: string;
    email: string;
    role: Role;
};
