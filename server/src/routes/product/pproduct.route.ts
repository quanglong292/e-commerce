import ProductModel from "@/models/product";
import { Request, Response, Router } from "express";
import { v4 } from "uuid";

const router = Router()

router.get("/", async (red: Request, res: Response) => {
    try {
        const data = await ProductModel.find()

        res.json(data)
    } catch(error) {
        res.status(404)
    }
}).post("/", async ({body}: Request, res: Response) => {
    try {
        const data = await ProductModel.create({
            id: v4(),
            available: true,
            ...body
        })

        res.json(data)
    } catch(error) {
        res.status(404)
    }
}).delete("/", async ({body}: Request, res: Response) => {
    try {
        const data = await ProductModel.deleteOne({id: body.id})

        res.json(data)
    } catch(error) {
        res.status(404)
    }
})

export default router