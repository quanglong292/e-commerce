import userControll, { generateToken } from "@/controllers/user.controll";
import cart from "@/models/cart";
import UserModel from "@/models/user";
import { IUser } from "@/types/user.type";
import { Request, Response, Router } from "express";
import { v4 } from "uuid";

const router = Router();

// controllers
const { validateCreateUser } = userControll();

router.get("/", async (req: Request, res: Response) => {
  const { query } = req;
  const isEmptyQuery = !Object.keys(query).length;

  try {
    const data: IUser | any = await UserModel.find(query);
    if (!data.length) return res.status(401).json('Invalid user/password!');
    const orderHistory: any = await cart.find({ creator: query.userName });
    if (isEmptyQuery) res.json(data);
    const token = generateToken(data);

    res.json({ token, orderHistory });
  } catch (err) {
    res.status(500);
  }
});

router.post("/", async ({ body }: Request, res: Response) => {
  const isExist = await UserModel.find({ userName: body.userName });
  if (isExist.length) return res.status(401).json('UserName is existed!');

  try {
    validateCreateUser(body);
    const { mail, ...restBody } = body;
    const info = restBody.info ? restBody.info : {
      name: "",
      phone: "",
      birthDay: "",
      mail: mail || "",
    }

    body = {
      ...restBody,
      id: v4(),
      info,
      carts: [],
      wishs: [],
      orderHistory: [],
    };

    const data = await UserModel.create(body);
    console.log({ data });


    res.json(data);
  } catch (err) {
    res.status(404).send('Bad request!');
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const data = await UserModel.deleteOne({ id: req?.body?.id ?? "" });

    res.json(data);
  } catch (err) {
    res.status(404);
  }
});

export default router;
