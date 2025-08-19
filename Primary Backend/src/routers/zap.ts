import { Router } from "express";
import { authMiddleWare } from "../middleware/AuthMiddleWare";
import {zapHandler,getAllZaps,zapFetchHandler} from "../controllers/zap"
const router = Router();

//post a zap
router.post('/',authMiddleWare,zapHandler)

//show all zaps
router.get('/',authMiddleWare,getAllZaps)

//show a particular zap
router.get('/:zapId',authMiddleWare,zapFetchHandler)

export const zapRouter = router;