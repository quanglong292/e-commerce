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

    res.json(data);
  } catch (err) {
    res.status(404).send('Bad request!');
  }
});

router.put("/", async ({ body }: Request, res: Response) => {
  if (!body) return res.status(404).send('Bad request!');

  const { id, ...rest } = body

  try {
    const data = await UserModel.findOne({ id: id });
    const objectData = data?.toObject()

    if (data) {
      if (rest.address) {

        if (rest.address.id) {
          data.address = data.address.map(i => i.id === rest.address.id ? ({ ...i, ...rest.address }) : i)
        }
        else data.address = [...objectData?.address ?? [], { ...rest.address, id: v4() }]
      } else {
        const key = Object.keys(rest)[0]
        console.log({ data, rest, key });

        data[key] = rest[key]
      }
    }

    console.log({ data });


    data?.save()
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

router.delete("/address", async ({ body }: Request, res: Response) => {
  try {
    const userAddressDoc = await UserModel.findOne({ id: body?.id });
    let addressData = userAddressDoc?.toObject()

    if (userAddressDoc) {
      userAddressDoc.address = addressData?.address?.filter(i => i.id !== body?.address?.id) ?? userAddressDoc.address
    }

    userAddressDoc?.save()

    res.json(userAddressDoc);
  } catch (err) {
    res.status(404);
  }
});

export default router;
