import { post, get } from "./utils.service";

export const signin = async (email, password) => {
    const res = await post(`/auth/signin`, { email, password });
    return await res.json();
};

export const signup = async (user: { email: string, pseudo: string, password: string }) => {
    const res = await post(`/auth/signup`, user);
    return await res.json();
};

export const isEmailFree = async email => {
    const res = await get(`/auth/email-free/${email}`);
    return await res.json();
};