import { NextFunction, Request, Response } from "express"
import {verify} from "jsonwebtoken";
const SECRET_KEY: any = process.env.SECRET_KEY

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader: any = req.headers["authorization"]
    const token: any = authHeader && authHeader.split(' ')[1];

    if (!token) res.sendStatus(401);

    verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) res.sendStatus(403);
        // req.user = user;
        next();
    });
}