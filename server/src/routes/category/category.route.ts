import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import CategoryGroupModel from "@/models/categoryGroup";

const router = Router()

router.get("/group", async (red: Request, res: Response) => {    
    try {
        const data = await CategoryGroupModel.find()
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.post("/group", async (red: Request, res: Response) => {
    const { body } = red
    
    try {
        const data = await CategoryGroupModel.create({
            id: uuidv4(),
            name: body.name
        })
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.delete("/group", async (red: Request, res: Response) => {
    const { body: {id} } = red

    try {
        const data = await CategoryGroupModel.deleteOne({
            id
        })
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

export default router