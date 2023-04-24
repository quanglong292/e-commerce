import { IFilterOptions } from '@/types/product.type';
import ProductModel from "@/models/product";
import { productServices } from "@/services/products";
import { Request, Response, Router } from "express";
import { Schema } from "mongoose";
import { v4 } from "uuid";

const router = Router()
const {generateFilterOptions} = productServices()

router.get("/", async (req: Request<IFilterOptions>, res: Response) => {
    const {query}: IFilterOptions | any = req
    
    try {
        const data = await ProductModel.find(query)

        res.json(data)
    } catch(error) {
        res.status(404)
    }
}).post("/", async ({body}: Request, res: Response) => {
    console.log("body", body);
    
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
}).post("/migrate", async ({body}, res) => {
    try {
        const data = await ProductModel.findOneAndUpdate({name: body.name }, { id: v4() })

        res.json(data)
    } catch(error) {
        res.status(404)
    }
})

export default router