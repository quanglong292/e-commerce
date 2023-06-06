import { REQUEST_PARAMS } from "../constants/urlPath.constant";
import fetcher from "../helpers/fetcher";
import formatPrice from "../helpers/formatPrice";
import handleClientError from "../helpers/handleClientError";

export default (cart, { user, token } = {}) => {
  const amounts = generateTotalAmount(cart);

  function generateTotalAmount(list) {
    // console.log({ generateTotalAmount: list });
    const total = list.reduce((sum, i) => sum + i.count * i.product.price, 0);
    const currencyPrice = formatPrice(total);

    return { currencyPrice, price: total };
  }

  function generateCartData() {
    return {
      creator: user?.userName,
      totalPrice: amounts.price,
      products: cart.map(({ product, ...i }) => ({
        id: product.id,
        value: i.id,
        amount: i.count,
        info: {
          name: product.name,
          image: product.bannerImage,
          price: Number(product.price),
        },
      })),
    };
  }

  const createPayment = async () => {
    try {
      if (!user) throw { message: "Please login!" };
      // console.log({ generateCartData: generateCartData() });
      const data = await fetcher(REQUEST_PARAMS.ADD_CART, generateCartData());

      return data;
    } catch (error) {
      handleClientError(error);
    }
  };

  return { amounts, createPayment, generateCartData };
};
