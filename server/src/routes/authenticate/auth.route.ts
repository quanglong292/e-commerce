import { Router, Request, Response } from "express";
import { sign } from "jsonwebtoken";
const router = Router()

router.get("/:id", (red: Request, res: Response) => {
    res.send("Hello get id router " + red.params.id)
})

router.post("/", (red: Request, res: Response) => {
    const { body } = red
    const { userName, password } = body

    if (userName !== "123" || password !== "123") return res.sendStatus(401)

    const id = new Date().getTime().toString() + "test"
    const exp = Math.floor(Date.now() / 1000) + (60 * 60)
    const token = sign({
        id,
        exp,
    }, process.env.SECRET_KEY as any)

    res.json({
        id,
        token,
    })
})

router.post("/register", (red: Request, res: Response) => {
    const { body } = red
    // Validating in FE (client)

    res.json({
        ...body,
        message: "Success!",
    })
})

export default router