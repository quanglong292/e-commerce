import { handleCreateComment, handleCreateThreadComment } from "@/controllers/community.controll"
import Comunity, { ThreadCommentModel } from "@/models/comunity"
import { Request, Response, Router } from "express"

const router = Router()

router.get("/comment", async (req: Request, res: Response) => {
    const {query} = req    
    if (!query) res.status(404)

    try {
        const data = await Comunity.find(query)
    
        res.json(data)
    } catch (err) {
        res.status(500)
    }
})

router.post("/comment", async (req: Request, res: Response) => {
    const {body} = req
    if (!body) res.status(404)

    try {
        const data = await handleCreateComment(body)
    
        res.json(data)
    } catch (err) {     
        res.status(500)
    }
})

router.get("/thread", async (req: Request, res: Response) => {
    const {query} = req    
    if (!query) res.status(404)

    try {
        const data = await ThreadCommentModel.find(query)
    
        res.json(data)
    } catch (err) {
        res.status(500)
    }
})

router.post("/thread", async (req: Request, res: Response) => {
    const {body} = req
    if (!body) res.status(404)

    try {
        const data = await handleCreateThreadComment(body)
    
        res.json(data)
    } catch (err) {
        res.status(500)
    }
})

router.delete("/", async (req: Request, res: Response) => {
    const {body} = req    
    if (!body) res.status(404)

    try {
        // const data: IUser | any = await UserModel.find(query)   
        // const token = generateToken(data)
    
        res.json({})
    } catch (err) {
        res.status(500)
    }
})

export default router