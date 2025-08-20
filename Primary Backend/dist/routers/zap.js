"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const AuthMiddleWare_1 = require("../middleware/AuthMiddleWare");
const zap_1 = require("../controllers/zap");
const router = (0, express_1.Router)();
//post a zap
router.post('/', AuthMiddleWare_1.authMiddleWare, zap_1.zapHandler);
//show all zaps
router.get('/', AuthMiddleWare_1.authMiddleWare, zap_1.getAllZaps);
//show a particular zap
router.get('/:zapId', AuthMiddleWare_1.authMiddleWare, zap_1.zapFetchHandler);
exports.zapRouter = router;
