import { Request, Response, Router } from "express";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { TIME_FORMAT } from "@/utils/constant";
import CartModel from "@/models/cart";
import { handleUserOrderHistory } from "@/controllers/cart.controll";

const router = Router()

router.get("/", async ({ query }: Request, res: Response) => {
    try {
        const data = await CartModel.find(query)

        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

router.post("/", async ({ body }: Request, res: Response) => {
    try {
        validateCreateCart(body)
        body = { ...body, id: v4(), createDate: dayjs().format(TIME_FORMAT) }
        const data = await CartModel.create(body)

        res.json(data)
    } catch (error) {
        res.status(404)
    }

})

router.delete("/", async (red: Request, res: Response) => {
    try {
        const data = await CartModel.deleteOne({ id: red?.body?.id })

        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

router.get("/history/", async ({ query }: Request, res: Response) => {
    try {
        if (!query?.creator) throw ""

        const data = await handleUserOrderHistory(query.creator)

        res.json(data)
    } catch (error: any) {        
        if (error instanceof Error) console.log(error.message);
        res.status(404)
    }
})

export default router

function validateCreateCart(body: any) {
    if (!body.creator || !body.products.length) throw ""
}