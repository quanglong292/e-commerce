import Brand, {BrandSchema} from "@/models/brand";
import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.get("/", async (red: Request, res: Response) => {
    try {
        const data = await Brand.find()
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.post("/", async (red: Request, res: Response) => {
    const {body} = red
    const {name, categories, image, description = "", fields = ""} = body
    try {
        const getStock = {
            available: true,
            sold: Math.floor(Math.random()*99)
        }
        const data = await Brand.create({
            id: uuidv4(),
            name,
            image,
            description,
            categories,
            stock: getStock,
            fields,
        })        

        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.delete("/", async ({body}: Request, res: Response) => {
    try {
        const data = await Brand.deleteOne({id: body.id})

        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

export default router