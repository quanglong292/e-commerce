import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import CategoryGroupModel from "@/models/categoryGroup";
import Category from "@/models/category";

const router = Router()

// CATEGORY
router.get("/", async (red: Request, res: Response) => {    
    try {
        const data = await Category.find()
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.post("/", async (red: Request, res: Response) => {
    const { body: {name, groups, ...restBody} } = red
    
    try {
        if (!groups?.length || !name) throw ""
        const data = await Category.create({
            id: uuidv4(),
            name: name,
            groups,
        })
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.delete("/", async (red: Request, res: Response) => {
    const { body: {id} } = red

    try {
        if (!id) throw ""
        const data = await Category.deleteOne({
            id
        })
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.post("/delMany", async (red: Request, res: Response) => {
    // const { body: {name, groups, ...restBody} } = red
    
    try {
        // if (!groups?.length || !name) throw ""
        const data = await Category.deleteMany({
            groups: [],
        })
    
        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

// CATEGORY GROUP
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