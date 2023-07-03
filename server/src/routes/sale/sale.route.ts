import SaleModel from "@/models/sale";
import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", async (red: Request, res: Response) => {
  try {
    const data: any = await SaleModel.find();
    // const products = await findManyByIds(product, data.products.map(i => i.id))
    res.json(data);
  } catch (err) {
    res.status(404);
  }
});

router.post("/", async ({ body }: Request, res: Response) => {
  try {
    if (body.id) {
      const data = await SaleModel.findOneAndUpdate({ id: body.id }, body);
      res.json(data);
      return;
    }
    const data = await SaleModel.create({ id: uuidv4(), ...body });
    res.json(data);
  } catch (err) {
    res.status(404);
  }
});

router.delete("/", async ({ body }: Request, res: Response) => {
  try {
    const data = await SaleModel.deleteOne({ id: body?.id });
    res.json(data);
  } catch (err) {
    res.status(404);
  }
});

export default router;
