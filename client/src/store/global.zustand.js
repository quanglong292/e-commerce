import { create } from "zustand";
import fetcher from "../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import useToken from "../utils/composables/useToken";
import handleClientError from "../utils/helpers/handleClientError";
import { notification } from "antd";

const { parseJwt, logout, getToken } = useToken();

const useGlobalStore = create((set, get) => ({
  loading: false,
  token: null,
  user: null,
  showLogin: false,
  address: [],
  setting: null,
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
    // console.log({ body, user }, { ...body, id: user.id });
    if (!body || !user || !user?.id) return;

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
      notification.success({
        key: 1,
        message: "Update successful!",
      });
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
    const parsedToken = parseJwt(data.token);

    return set((state) => {
      if (!["ViewAuthenticate"].includes(view)) state.toggleLoginModal();
      return {
        token: parsedToken,
        user: { ...parsedToken[0], orderHistory: data.orderHistory },
      };
    });
  },
  hadnleGetSetting: async (type) => {
    const state = get();
    if (state.setting && !type) return;

    try {
      const data = await fetcher(REQUEST_PARAMS.GET_SETTING);
      set({ setting: data });

      return data;
    } catch (error) {
      handleClientError(error);
    }
  },
}));

export default useGlobalStore;
