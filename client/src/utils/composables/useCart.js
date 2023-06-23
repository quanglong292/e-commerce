import { notification } from "antd";
import { REQUEST_PARAMS } from "../constants/urlPath.constant";
import fetcher from "../helpers/fetcher";
import formatPrice from "../helpers/formatPrice";
import { createOrder as createGHNOrder } from "../helpers/ghnFetcher";
import handleClientError from "../helpers/handleClientError";

export default (cart = [], { user, token } = {}) => {
  const amounts = generateTotalAmount(cart);

  function generateTotalAmount(list) {
    const total = list.reduce((sum, i) => sum + i.count * i.product.price, 0);
    const currencyPrice = formatPrice(total);

    return { currencyPrice, price: total };
  }

  function generateCartData(shippingOrderInfo = {}) {
    return {
      creator: user?.userName,
      totalPrice: amounts.price,
      shippingOrderInfo,
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
      let submitData = generateCartData();
      // const shipData = await createGHNOrder({
      //   client_order_code: user?.userName,
      //   from_name: user?.userName,
      //   to_name: user?.userName,
      //   note: "Mike testing!",
      // });

      // submitData.shippingOrderInfo = shipData;

      const data = await fetcher(REQUEST_PARAMS.ADD_CART, submitData);
      notification.success({
        message: "Create order success, wait for admin approve!",
      });
      return data;
    } catch (error) {
      handleClientError(error);
    }
  };

  return { amounts, createPayment, generateCartData };
};
