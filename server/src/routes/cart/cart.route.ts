import { Request, Response, Router } from "express";
import CartModel from "@/models/cart";

const router = Router()

router.get("/", async ({query}: Request, res: Response) => {
    try {
        const data = await CartModel.find(query)
        
        res.json(data)
    } catch (error) {
        res.status(404)
    }

}).post("/", async ({body}: Request, res: Response) => {
    try {
        validateCreateCart(body)
        const data = await CartModel.create(body)
        
        res.json(data)
    } catch (error) {
        res.status(404)
    }

}).delete("/", async (red: Request, res: Response) => {
    try {
        const data = await CartModel.deleteOne({id: red?.body?.id})
        
        res.json(data)
    } catch (error) {
        res.status(404)
    }
})

export default router

function validateCreateCart(body: any) {
    if (!body.creator || !body.products.length) throw ""
}