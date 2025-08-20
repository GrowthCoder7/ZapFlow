import { Router } from "express";
import { authMiddleWare } from "../middleware/AuthMiddleWare";
import {signupHandler,signinHandler,userHandler} from "../controllers/user"

const router = Router();

//signup
router.post("/signup",signupHandler)

//signin
router.post("/signin",signinHandler)

//show user
router.get("/",authMiddleWare,userHandler)

export const userRouter = router;