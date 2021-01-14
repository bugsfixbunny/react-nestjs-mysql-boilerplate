
export interface User {
    userId?: number;
    pseudo?: string;
    email?: string;
    password?: string;
    role?: "user" | "premium" | "admin";
}