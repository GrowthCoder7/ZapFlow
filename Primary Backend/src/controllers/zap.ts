import express,{Request,Response} from "express"
import {client} from "../db/index"
import {ZapSchema} from "../types/index"

async function zapHandler(req:Request,res:Response) {
    const body = req.body
    const parsedData = ZapSchema.safeParse(body)
    if(!parsedData.success){
        return res.status(403).send("Wrong inputs!")
    }
    
    await client.$transaction(async tx=>{
        const zap = await tx.zap.create({
            data:{
                triggerId:"",
                //@ts-ignore
                userId:req.userId,
                actions:{
                    create:parsedData.data.actions.map((x,index)=>({
                        actionId:x.availableActionId,
                        sortingOrder:index
                    }))
                }
            }
        })

        const trigger=await tx.trigger.create({
            data:{
                triggerId:parsedData.data.availableTriggerId,
                zapId:zap.id
            }
        })

        await tx.zap.update({
            where:{
                id:zap.id
            },
            data:{
                triggerId:trigger.id
            }
        })
    })
}

async function getAllZaps(req:Request,res:Response) {
    const zaps = await client.zap.findMany({
        where:{
            //@ts-ignore
            userId:req.userId
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },
            trigger:{
                include:{
                    type:true
                }
            }
        }
    })
    return res.status(200).json(zaps)
}

async function zapFetchHandler(req:Request,res:Response) {
    const zapId = req.params.zapId
    const zap = await client.zap.findFirst({
        where:{
            //@ts-ignore
            userId:req.userId,
            id:zapId
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },
            trigger:{
                include:{
                    type:true
                }
            }
        }
    })
    return res.status(200).json(zap)
}

export{
    zapFetchHandler,
    zapHandler,
    getAllZaps
}