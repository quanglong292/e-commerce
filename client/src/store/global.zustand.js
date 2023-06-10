import { create } from "zustand";
import fetcher from "../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import useToken from "../utils/composables/useToken";

const { parseJwt, logout, getToken } = useToken();

const useGlobalStore = create((set) => ({
  loading: false,
  token: null,
  user: null,
  showLogin: false,
  toggleLoginModal: () => set((state) => ({ showLogin: !state.showLogin })),
  checkToken: () => {
    const token = parseJwt(getToken());
    // console.log({ token });

    if (!token) return false;

    set(() => ({ token: parseJwt(getToken()), user: token["0"] }));
    return token;
  },
  setToken: () => {
    console.log({ setToken: parseJwt(getToken()) });
    return set(() => ({ token: parseJwt(getToken()) }));
  },
  handleLogout: () => {
    logout();
    return set(() => ({ token: null }));
  },
  handleRegister: async (body) => {
    try {
      await fetcher(REQUEST_PARAMS.ADD_USER, body);
      return true;
    } catch (error) {}
  },
  handleLogin: async ({ payload }, view = "default") => {
    const data = await fetcher(REQUEST_PARAMS.GET_USER, payload);
    document.cookie = JSON.stringify(data.token);

    return set((state) => {
      if (!["ViewAuthenticate"].includes(view)) state.toggleLoginModal();
      return {
        token: parseJwt(data.token),
        user: { ...payload, orderHistory: data.orderHistory },
      };
    });
  },
}));

export default useGlobalStore;
