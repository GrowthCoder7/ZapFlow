import express from "express"
import {} from "@prisma/client"
import { userRouter } from "./routers/user";
import { zapRouter } from "./routers/zap";

const app = express();
const PORT=3000;

app.use(express.json())
app.use("/api/v1/user/",userRouter);
app.use("/api/v1/zap/",zapRouter)

app.listen(PORT,()=>{
    console.log("Server running!");
})