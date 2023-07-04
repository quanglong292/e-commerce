import { create } from "zustand";
import { ORDER_WISH_ACTION_TYPES } from "./types";
import { REQUEST_PARAMS } from "../utils/constants/urlPath.constant";
import fetcher from "../utils/helpers/fetcher";
import { FILTER_OPTIONS } from "../utils/constants/navigation.constant";

const handleAddNewList = (origin = [], update = []) => {
  const Arrays = {
    long: origin.length > update.length ? origin : update,
    short: origin.length < update.length ? origin : update,
  };
  return Arrays.long.map((i) => {
    const found = Arrays.short.find(
      (j) => j.product.name === i.product.name && j.id === i.id
    );

    if (found) {
      return { ...i, count: i.count + found.count };
    } else return i;
  });
  // return [...origin, ...update].reduce((a, { id, count, ...i }) => {
  //   const exist = a.find((j) => j.product.name === i.product.name);
  //   if (exist) exist.count += count;
  //   else a.push({ ...i, id, count });

  //   return a;
  // }, []);
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
  allProducts: [],
  products: [],
  wishList: [],
  ordersList: [],
  filterOptions: {},
  checkoutInfo: {
    address: null,
  },
  comments: [],
  mutateList: (listName, { payload }) => {
    const isProduct = ["products"].includes(listName);
    if (isProduct) return set(() => ({ [listName]: payload }));

    return set((state) => {
      const newList = isProduct
        ? handleAddNewList(state[listName], payload)
        : payload;

      return { [listName]: newList };
    });
  },
  mutateData: (field, data) => {
    return set(() => ({ [field]: data }));
  },
  setFilter: async (field, value) => {
    const { filterOptions, fetch } = get();
    const updateFilter =
      typeof field === "object" ? field : { ...filterOptions, [field]: value };

    set(() => {
      return { filterOptions: updateFilter };
    });
    fetch();
  },
  toggleLoading: () => set((state) => ({ loading: !state.loading })),

  // Asyncs
  fetchComments: async (productId) => {
    const { toggleLoading } = get();
    toggleLoading();
    const response = await fetcher(REQUEST_PARAMS.GET_COMMENT, { productId });
    toggleLoading();
    set({ comments: response });
  },
  fetch: async (type) => {
    const { filterOptions, toggleLoading } = get();
    const isHasFilter = findIsHasFilter(filterOptions);

    if (isHasFilter || type === "all") {
      const options = type ? {} : filterOptions;
      toggleLoading();
      console.log({ options, filterOptions });
      const response = await fetcher(REQUEST_PARAMS.GET_PRODUCT, options);
      toggleLoading();
      if (type) {
        return set({ allProducts: response });
      }
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
