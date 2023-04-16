import { create } from "zustand";
import { ORDER_WISH_ACTION_TYPES } from "./types";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import fetcher from "../utils/functions/fetcher";

const handleAddNewList = (origin = [], update = []) => {
  return [...origin, ...update].reduce((a, { id, count }) => {
    const exist = a.find((j) => j.id === id);
    if (exist) exist.count += count;
    else a.push({ id, count });

    return a;
  }, []);
};

const useProductStore = create((set) => ({
  bears: 0,
  products: [],
  wishList: [],
  ordersList: [],
  mutateList: (listName, { payload }) =>
    set((state) => {
      const newList = handleAddNewList(state[listName], payload);
      return { [listName]: newList };
    }),
  fetch: async () => {
    const response = await fetcher(REQUEST_PARAMS.GET_PRODUCT);
    set({ products: response });
  },
}));

export default useProductStore;
