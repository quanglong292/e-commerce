import { create } from "zustand";
import dayjs from "dayjs";

const useGlobalStore = create((set) => ({
  tkn: null,
  showLogin: false,
  handleLogin: ({ payload }) => {
    const { username, password } = payload;

    if (!(username === "admin@mike.com" && password === "admin123")) return;

    return set((state) => {
        state.toggleLoginModal()
        return ({ tkn: new Date(dayjs().add(7, "day")).getTime() })
    });
  },
  toggleLoginModal: () => set((state) => ({ showLogin: !state.showLogin })),
}));

export default useGlobalStore
