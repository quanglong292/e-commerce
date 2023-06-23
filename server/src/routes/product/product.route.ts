import { IFilterOptions } from '@/types/product.type';
import ProductModel from "@/models/product";
import { productServices } from "@/services/products";
import { Request, Response, Router } from "express";
import { Schema } from "mongoose";
import { v4 } from "uuid";
import { findProductGroup, handleGetProduct } from '@/controllers/product.controll';

const router = Router()
const { generateFilterOptions } = productServices()

router.get("/", async (req: Request<IFilterOptions>, res: Response) => {
    let { query }: IFilterOptions | any = req
    try {
        const data = await handleGetProduct(query)

        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

router.post("/", async ({ body }: Request, res: Response) => {
    try {
        const group = await findProductGroup(body.category)
        const data = await ProductModel.create({
            id: v4(),
            available: true,
            ...body,
            group
        })

        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

router.put("/", async ({ body }: Request, res: Response) => {
    const { id, ...restBody } = body
    try {
        const updatedRes = await ProductModel.findOneAndUpdate({ id }, body, { new: true })

        res.json(updatedRes)
    } catch (error) {
        res.status(404)
    }
})

router.post("/", async ({ body }: Request, res: Response) => {
    try {
        const data = await ProductModel.create({
            id: v4(),
            available: true,
            ...body
        })

        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

router.delete("/", async ({ body }: Request, res: Response) => {
    try {
        const data = await ProductModel.deleteOne({ id: body.id })

        res.json(data)
    } catch (error) {
        res.status(404)
    }
}).post("/migrate", async ({ body }, res) => {
    try {
        const data = await ProductModel.findOneAndUpdate({ name: body.name }, { id: v4() })

        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

export default router