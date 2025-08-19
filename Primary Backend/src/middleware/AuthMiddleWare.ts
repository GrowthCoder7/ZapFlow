import express, { Request,Response,NextFunction } from "express"

async function MiddleWare(req:Request,res:Response,next:NextFunction) {
    
}

export const authMiddleWare=MiddleWare;