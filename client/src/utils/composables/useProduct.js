export const getSizes = (stocks = []) => {
  if (!stocks.length) return [];
  return stocks
    .filter((i) => i)
    .map((i) => ({ ...i, label: i.name, id: i.name }));
};

export const useProduct = (productStore) => {
  const { categories = [], products = [], fetch, fetchInitData } = productStore;

  const getCategory = (id) => categories?.find((i) => i.id === id) ?? {};
  const getProduct = (id) => products?.find((i) => i.id === id) ?? {};

  return { getCategory, getProduct };
};
