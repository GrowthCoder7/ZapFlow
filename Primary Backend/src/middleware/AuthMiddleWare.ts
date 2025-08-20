import express, { Request,Response,NextFunction } from "express"
import {verify} from "jsonwebtoken"
import { JWT_SECRET } from "../config";

async function MiddleWare(req:Request,res:Response,next:NextFunction) {
    const token = req.headers.authorization as unknown as string;
    try {
        const payload = verify(token,JWT_SECRET)
        //@ts-ignore
        req.userId = payload.userId;
        next()
    } catch (error) {
        return res.status(403).send("You are not logged in!")
    }
}   

export const authMiddleWare=MiddleWare;