import { notification } from "antd";
import { REQUEST_PARAMS } from "../constants/urlPath.constant";
import fetcher from "../helpers/fetcher";
import formatPrice from "../helpers/formatPrice";
import handleClientError from "../helpers/handleClientError";

function generateTotalAmount(list) {
  const total = list.reduce((sum, i) => sum + i.count * i.product.price, 0);
  const currencyPrice = formatPrice(total);

  return { currencyPrice, price: total };
}

export default (cart = [], { user, checkoutInfo } = {}) => {
  const amounts = generateTotalAmount(cart);

  function generateCartData(shippingOrderInfo = {}) {
    return {
      creator: user?.userName,
      totalPrice: amounts.price,
      shippingOrderInfo,
      user: {
        ...user.info,
        address: checkoutInfo.address,
      },
      isWholeSale: Boolean(checkoutInfo?.isWholeSale),
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
      if (
        !checkoutInfo?.address ||
        typeof checkoutInfo?.isWholeSale !== "boolean"
      )
        throw { message: "Missing required data!" };
      let submitData = generateCartData();
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
