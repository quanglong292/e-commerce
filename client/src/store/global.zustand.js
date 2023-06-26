import { create } from "zustand";
import fetcher from "../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import useToken from "../utils/composables/useToken";
import handleClientError from "../utils/helpers/handleClientError";

const { parseJwt, logout, getToken } = useToken();

const useGlobalStore = create((set, get) => ({
  loading: false,
  token: null,
  user: null,
  showLogin: false,
  address: [],
  mutateData: (field, data) => set(() => ({ [field]: data })),
  toggleLoginModal: () => set((state) => ({ showLogin: !state.showLogin })),
  checkToken: () => {
    const token = parseJwt(getToken());
    if (!token) return false;
    const { address } = get();

    if (!address.length) {
      set(() => ({ address: token["0"]?.address }));
    }

    set(() => ({ token: parseJwt(getToken()), user: token["0"] }));
    return token;
  },
  setToken: () => {
    return set(() => ({ token: parseJwt(getToken()) }));
  },
  handleLogout: () => {
    set(() => ({ token: null, user: null }));
    logout();
  },
  handleUpdate: async (body, type) => {
    const { user, handleLogin } = get();
    if (!body || !user) return;
    try {
      const request =
        type === "delete"
          ? REQUEST_PARAMS.DELETE_USER_ADDRESS
          : REQUEST_PARAMS.UPDATE_USER;

      const data = await fetcher(request, { ...body, id: user.id });
      set({ address: data?.address ?? [] });
      await handleLogin(
        {
          payload: {
            userName: user.userName,
            password: user.password,
          },
        },
        "ViewAuthenticate"
      );
    } catch (error) {
      handleClientError(error);
    }
  },
  handleRegister: async (body) => {
    try {
      return await fetcher(REQUEST_PARAMS.ADD_USER, body);
    } catch (error) {
      handleClientError(error);
    }
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
