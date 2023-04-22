import { create } from "zustand";
import { ORDER_WISH_ACTION_TYPES } from "./types";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import fetcher from "../utils/functions/fetcher";
import { FILTER_OPTIONS } from "../utils/constants/navigation.constant";

const handleAddNewList = (origin = [], update = []) => {
  return [...origin, ...update].reduce((a, { id, count }) => {
    const exist = a.find((j) => j.id === id);
    if (exist) exist.count += count;
    else a.push({ id, count });

    return a;
  }, []);
};

const findIsHasFilter = (options) => {
  return Boolean(
    Object.values(FILTER_OPTIONS).find((i) => Boolean(options[i]))
  );
};

const useProductStore = create((set, get) => ({
  loading: false,
  bears: 0,
  categories: [],
  categoryGroups: [],
  products: [],
  wishList: [],
  ordersList: [],
  filterOptions: {},
  mutateList: (listName, { payload }) =>
    set((state) => {
      const newList = handleAddNewList(state[listName], payload);
      return { [listName]: newList };
    }),
  setFilter: (field, value) =>
    set((state) => {
      return { filterOptions: { ...state.filterOptions, [field]: value } };
    }),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
  fetch: async (type) => {
    const { filterOptions, toggleLoading } = get();
    const isHasFilter = findIsHasFilter(filterOptions);

    if (isHasFilter || type === "all") {
      const options = type ? {} : filterOptions;
      toggleLoading();
      const response = await fetcher(REQUEST_PARAMS.GET_PRODUCT, options);
      toggleLoading();
      set({ products: response });
    }
  },
  fetchInitData: async () => {
    const { categories, categoryGroups, toggleLoading } = get();
    if (categories.length || categoryGroups.length) return;

    toggleLoading();
    const categoriesRes = await fetcher(REQUEST_PARAMS.GET_CATEGORY);
    const groupRes = await fetcher(REQUEST_PARAMS.GET_CATEGORY_GROUP);
    toggleLoading();

    set({ categories: categoriesRes, categoryGroups: groupRes });
  },
}));

export default useProductStore;
