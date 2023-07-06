import { Request, Response, Router } from "express";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { TIME_FORMAT } from "@/utils/constant";
import CartModel from "@/models/cart";
import { handleUserOrderHistory } from "@/controllers/cart.controll";
import ProductModel from "@/models/product";

const router = Router();

router.get("/", async ({ query }: Request, res: Response) => {
  try {
    const data = await CartModel.find(query);

    res.json(data);
  } catch (error) {
    res.status(404);
  }
});

router.post("/", async ({ body }: Request, res: Response) => {
  try {
    validateCreateCart(body);
    body = {
      ...body,
      id: v4(),
      createDate: dayjs().format(TIME_FORMAT),
      status: "pending",
    };
    const data = await CartModel.create(body);
    for (const item of body.products) {
      const productDoc = await ProductModel.findOne({ id: item.id })
      const newStocks: any = productDoc?.toObject().stocks.map((stock) => {
        if (stock.name === item.value) {
          let updateStock = { ...stock, value: `${stock?.value || 0 >= item.amount ? Number(stock.value) - item.amount : 0}` }

          return updateStock
        }
        return stock
      })
      const isOutOfStock = !newStocks.find((stock) => Boolean(Number(stock.value)))

      if (productDoc) {
        productDoc.stocks = newStocks
        if (isOutOfStock) productDoc.available = false
      }

      await productDoc?.save()
    }

    res.json(data);
  } catch (error) {
    res.status(404);
  }
});

router.post("/confirm", async ({ body }: Request, res: Response) => {
  try {
    if (!body.status || !body.id) return res.status(404);
    const data = await CartModel.findOneAndUpdate(
      { id: body.id },
      { status: body.status, shippingOrderInfo: body.shippingOrderInfo }
    );

    res.json(data);
  } catch (error) {
    res.status(404);
  }
});

router.delete("/", async (red: Request, res: Response) => {
  if (!red?.body?.id) res.status(404).json("Missing id to delete")
  try {
    const data = await CartModel.deleteOne({ id: red?.body?.id });

    res.json(data);
  } catch (error) {
    res.status(404);
  }
});

router.get("/history/", async ({ query }: Request, res: Response) => {
  try {
    if (!query?.creator) throw "";
    const data = await handleUserOrderHistory(query.creator);
    // console.log({ data12354: data });

    res.json(data);
  } catch (error: any) {
    if (error instanceof Error) console.log(error.message);
    res.status(404);
  }
});

export default router;

function validateCreateCart(body: any) {
  if (!body.creator || !body.products.length) throw "";
}
