import { create } from "zustand";
import fetcher from "../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import useToken from "../utils/helpers/useToken";

const { token, parseJwt } = useToken();

const useGlobalStore = create((set) => ({
  loading: false,
  token: null,
  showLogin: false,
  toggleLoginModal: () => set((state) => ({ showLogin: !state.showLogin })),
  setToken: () => {
    return set(() => ({ token: parseJwt(token) }));
  },
  handleRegister: async (body) => {
    await fetcher(REQUEST_PARAMS.ADD_USER, body);

    return true;
  },
  handleLogin: async ({ payload }) => {
    const data = await fetcher(REQUEST_PARAMS.GET_USER, payload);
    document.cookie = JSON.stringify(data.token);

    return set((state) => {
      state.toggleLoginModal();
      return { token: parseJwt(data.token) };
    });
  },
}));

export default useGlobalStore;
