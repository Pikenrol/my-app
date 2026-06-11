import type { Role } from "./auth";

export type ApiUser = {
    id: string;
    email: string;
    fullName: string;
    role: Role;
};
