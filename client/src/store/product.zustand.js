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
  ordersList: [
    {
      product: {
        _id: "6443d7d18786dfda1f1fbc96",
        id: "0e8ecc23-b55a-40f8-a472-2a8e2c8c1d01",
        name: "Wmns Dunk Low SE 'Sandrift'",
        group: ["fb4e1888-071e-429f-ae47-9fd148a935e7"],
        category: ["bc82bba0-9d80-48a6-b5b5-228b62dbe1c7"],
        brand: "29e98762-e996-458f-b59a-24a5b51eb3c3",
        price: 263,
        available: true,
        stocks: [
          {
            name: "7",
            value: "2",
            _id: "6443d7d18786dfda1f1fbc97",
          },
          {
            name: "7.5",
            value: "2",
            _id: "6443d7d18786dfda1f1fbc98",
          },
        ],
        size: [],
        detailImages: [
          {
            name: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/084/577/270/original/1097851_01.jpg.jpeg?action=crop&width=1250",
            value: "Main",
            _id: "6443d7d18786dfda1f1fbc99",
          },
        ],
        bannerImage:
          "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/084/577/270/original/1097851_01.jpg.jpeg?action=crop&width=1250",
        description:
          "The Nike Women’s Dunk Low SE ‘Sandrift’ pairs elevated materials with a muted color scheme. The hoops shoe turned wardrobe staple carries a taupe-colored leather upper with beige suede overlays accented with contrast stitching. Embossed Nike branding appears on the heel tab and the stitched tag that adorns the leather tongue. Lightweight cushioning is provided by a foam wedge housed within the cupsole, featuring off-white sidewalls and a sand-colored rubber outsole.",
        subType: [],
        __v: 0,
      },
      id: "7",
      count: 1,
    },
    {
      product: {
        _id: "6443d7d18786dfda1f1fbc96",
        id: "0e8ecc23-b55a-40f8-a472-2a8e2c8c1d01",
        name: "Wmns Dunk Low SE 'Sandrift'",
        group: ["fb4e1888-071e-429f-ae47-9fd148a935e7"],
        category: ["bc82bba0-9d80-48a6-b5b5-228b62dbe1c7"],
        brand: "29e98762-e996-458f-b59a-24a5b51eb3c3",
        price: 263,
        available: true,
        stocks: [
          {
            name: "7",
            value: "2",
            _id: "6443d7d18786dfda1f1fbc97",
          },
          {
            name: "7.5",
            value: "2",
            _id: "6443d7d18786dfda1f1fbc98",
          },
        ],
        size: [],
        detailImages: [
          {
            name: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/084/577/270/original/1097851_01.jpg.jpeg?action=crop&width=1250",
            value: "Main",
            _id: "6443d7d18786dfda1f1fbc99",
          },
        ],
        bannerImage:
          "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/084/577/270/original/1097851_01.jpg.jpeg?action=crop&width=1250",
        description:
          "The Nike Women’s Dunk Low SE ‘Sandrift’ pairs elevated materials with a muted color scheme. The hoops shoe turned wardrobe staple carries a taupe-colored leather upper with beige suede overlays accented with contrast stitching. Embossed Nike branding appears on the heel tab and the stitched tag that adorns the leather tongue. Lightweight cushioning is provided by a foam wedge housed within the cupsole, featuring off-white sidewalls and a sand-colored rubber outsole.",
        subType: [],
        __v: 0,
      },
      id: "7.5",
      count: 1,
    },
  ],
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
