import uniq from "lodash/uniq";
import cloneDeep from "lodash/cloneDeep";

import ProductModel from "@/models/product";
import CartModel from "@/models/cart";
import { ICart } from "@/types/cart.type";
import { IProduct } from "@/types/product.type";
import findManyByIds from "@/utils/helpers/findManyByIds";

const getProductInCart = async (carts: ICart[]): Promise<IProduct[] | []> => {
  const productIds: string[] = uniq(carts.map((i) => i.products).flat()?.map(i => i.id));
  const data: any = (await findManyByIds(ProductModel, productIds)) ?? [];
  if (!data.length) throw "No product found";

  return data;
};

export const handleUserOrderHistory = async (creator: any): Promise<any> => {
  // console.log("vo day");

  const cartOfUser: ICart[] = await CartModel.find({ creator });
  if (!cartOfUser.length) return [];
  const products: IProduct[] = await getProductInCart(cartOfUser);
  // console.log({ products123: products });

  return cartOfUser.map((i: any) => {
    const cart = cloneDeep(i._doc);
    // const mappedProducts = i.products.map((j: string) =>
    //   products.find((k) => k.id === j)
    // );
    // cart.products = mappedProducts;
    // i.products2 = products;
    // console.log({ cart1234: i });

    return {
      ...cart,
      products2: products,
    };
  });
};
