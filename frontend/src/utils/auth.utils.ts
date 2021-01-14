import { useSelector } from "react-redux";
import { getMe } from "../services/users.service";
import MeSlice from "../store/slices/me.slice";
import { store } from "../store/configure.store";

export const useLogin = () => {
    const me = useSelector(state => state.meStore);
    return { isLogin: Boolean(localStorage.getItem('token')), me };
}

export const login = async (jwt) => {
    localStorage.setItem('token', jwt);
    const res = await getMe();
    if (res) store.dispatch(MeSlice.actions.setMe(res));
}

export const logout = () => {
    store.dispatch(MeSlice.actions.resetMe());
    localStorage.removeItem('token');
}