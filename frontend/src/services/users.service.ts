import { get } from "./utils.service";

export const getMe = async () => {
    try {
        const res = await get(`/users/me`);
        return await res.json();
    } catch (e) {
        return null;
    }
};