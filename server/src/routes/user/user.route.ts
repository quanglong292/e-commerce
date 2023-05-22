import userControll, { generateToken } from '@/controllers/user.controll';
import UserModel from '@/models/user';
import { IUser } from '@/types/user.type';
import { Request, Response, Router } from "express";
import { v4 } from 'uuid';


const router = Router()

// controllers
const { validateCreateUser } = userControll()

router.get("/", async (req: Request, res: Response) => {
    const { query } = req
    const isEmptyQuery = !Object.keys(query).length

    try {
        const data: IUser | any = await UserModel.find(query)
        if (isEmptyQuery) res.json(data)
        const token = generateToken(data)

        res.json({ token })
    } catch (err) {
        res.status(500)
    }
})

router.post("/", async ({ body }: Request, res: Response) => {
    const isExist = await UserModel.find({ userName: body.userName })

    if (isExist.length) res.json(isExist[0])

    try {
        validateCreateUser(body)
        const { mail, ...restBody } = body
        body = {
            ...restBody,
            id: v4(),
            info: {
                name: "",
                phone: "",
                avatar: "",
                birthDay: "",
                mail: mail || "",
            },
            carts: [],
            wishs: [],
            orderHistory: []
        }

        const data = await UserModel.create(body)

        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.delete("/", async (req: Request, res: Response) => {
    try {
        const data = await UserModel.deleteOne({ id: req?.body?.id ?? "" })

        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

export default router