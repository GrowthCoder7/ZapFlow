import express ,{Request,Response}from "express"
import { signinSchema, signupSchema } from "../types/index"
import {client} from "../db"
import {sign} from "jsonwebtoken"
import { JWT_SECRET } from "../config"

async function signupHandler(req:Request,res:Response) {
    const body=req.body
    const parsedData = signupSchema.safeParse(body)
    if(!parsedData.success){
        res.status(411).json("Wrong inputs!")
    }

    const user = await client.user.findFirst({
        where:{
            email:parsedData.data?.email
        }
    })

    if(user){
        return res.json({
            msg:"User already exists"
        })
    }

    await client.user.create({
        data:{
            email:body.email,
            password:body.password,
            name:body.name
        }
    })
    
    return res.status(201).json({
        msg:"User created!"
    })
}

async function signinHandler(req:Request,res:Response) {
    const body = req.body;
    const parsedData = signinSchema.safeParse(body)

    if(!parsedData.success){
        return res.status(211).json({msg:"Wrong inputs"})
    }

    const user = await client.user.findFirst({
        where:{
            email:parsedData.data.email,
            password:parsedData.data.password
        }
    })

    if(!user) return res.status(411).send(
        "Wrong credentials"
    )

    const token = sign({userId:user.id},JWT_SECRET)

    return res.json({
        token:token
    })
}

async function userHandler(req:Request,res:Response) {
    //@ts-ignore
    const id = req.id;
    const user = await client.user.findFirst({
        where:id,
        select:{
            name:true,
            email:true
        }
    });

    return res.status(211).json({
        user
    })
}

export{
    signinHandler,
    signupHandler,
    userHandler
}