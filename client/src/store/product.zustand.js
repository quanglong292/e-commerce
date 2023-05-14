import { create } from "zustand";
import { ORDER_WISH_ACTION_TYPES } from "./types";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import fetcher from "../utils/helpers/fetcher";
import { FILTER_OPTIONS } from "../utils/constants/navigation.constant";

const handleAddNewList = (origin = [], update = []) => {
  return [...origin, ...update].reduce((a, { id, count, ...i }) => {
    const exist = a.find((j) => j.id === id);
    if (exist) exist.count += count;
    else a.push({ ...i, id, count });

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
  setFilter: async (field, value) => {
    const { filterOptions, fetch } = get();
    const updateFilter = { ...filterOptions, [field]: value };

    set(() => {
      return { filterOptions: updateFilter };
    });
    fetch();
  },
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
