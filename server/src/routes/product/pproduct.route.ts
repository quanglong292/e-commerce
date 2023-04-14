import ProductModel from "@/models/product";
import { Request, Response, Router } from "express";

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