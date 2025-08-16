import express from "express";
import {PrismaClient} from "@prisma/client"
import { log } from "console";

const client = new PrismaClient();

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId",async (req,res)=>{
    const userId = req.params.userId;
    const zapId=req.params.zapId;
    const body=req.body;

    await client.$transaction(async (tx)=>{
        const run= await tx.zapRun.create({
            data:{
                zapId:zapId,
                metadata:body
            }
        })

        await tx.zapRunOutbox.create({
            data:{
                // zapRunId:zapId
                zapRunId:run.id
            }
        })
    })
    return res.json({
        msg:"Webhook Received"
    })
})

app.listen(PORT,()=>{
    log("Server running!");
})