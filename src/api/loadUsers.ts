export type User = {
    email: string;
    password: string;
    role: string;
};

export const loadUsers = async (): Promise<User[]> => {
    const response = await fetch("http://localhost:3001/users");
    const result = await response.json();

    if (Array.isArray(result)) {
        return result;
    }

    if (Array.isArray(result?.data)) {
        return result.data;
    }

    return [];
};
