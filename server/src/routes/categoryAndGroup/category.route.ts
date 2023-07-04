import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import CategoryGroupModel from "@/models/categoryGroup";
import Category from "@/models/category";
import { forIn, rest } from "lodash";

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
    const { body: { name, groups, description, ...restBody } } = red

    try {
        if (!groups?.length || !name) throw ""
        const data = await Category.create({
            id: uuidv4(),
            name: name,
            groups,
            description: description || "",
        })

        res.json(data)
    } catch (err) {
        res.status(404)
    }
})

router.put("/", async ({ body }: Request, res: Response) => {
    if (!body || !body.id) res.status(404).json("Missing body")
    const { id, name, groups, description, ...rest } = body
    try {
        const data = await Category.findOneAndUpdate({ id: id }, { name, groups, description })

        res.json(data)
    } catch (err) {
        res.status(404).json("Something wrong")
    }
})

router.delete("/", async (red: Request, res: Response) => {
    const { body: { id } } = red

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
    try {
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

router.put("/group", async ({ body }: Request, res: Response) => {
    if (!body || !body.id) res.status(404).json("Missing body")
    try {
        const data = await CategoryGroupModel.findOneAndUpdate({ id: body.id }, body)

        res.json(data)
    } catch (err) {
        res.status(404).json("Something wrong")
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

router.post("/group-bulk", async (red: Request, res: Response) => {
    const { body } = red

    if (!body.length) return res.status(404).send("Missing body!")

    try {
        for (const item of body) {
            await CategoryGroupModel.findOneAndUpdate({ id: item.id }, { key: item.key })
        }
        const data = await CategoryGroupModel.find()

        res.json(data)
    } catch (err) {
        console.log({ err });

        res.status(404)
    }
})

router.delete("/group", async (red: Request, res: Response) => {
    const { body: { id } } = red

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