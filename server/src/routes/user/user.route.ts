import UserModel from '@/models/user';
import { Request, Response, Router } from "express";
import { v4 } from 'uuid';

const router = Router()

router.get("/", async (req: Request, res: Response) => {
    const {query} = req

    if (!query) res.status(404)

    try {
        const data = await UserModel.find(query)

        res.json(data)
    } catch (err) {
        res.status(404)
    }
}).post("/", async ({body}: Request, res: Response) => {
    try {
        validateCreateUser(body)
        body = {
            ...body,
            id: v4(),
            info: {
                name: "",
                phone: "",
                avatar: "",
                birthDay: "",
                mail: "",
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
}).delete("/", async (req: Request, res: Response) => {
    try {
        const {} = req
    } catch (err) {
        res.status(404)
    }
})

function validateCreateUser(body: any) {
    if (!body.userName || !body.password) throw ""
}