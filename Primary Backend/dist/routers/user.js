"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const AuthMiddleWare_1 = require("../middleware/AuthMiddleWare");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
//signup
router.post("/signup", user_1.signupHandler);
//signin
router.post("/signin", user_1.signinHandler);
//show user
router.get("/", AuthMiddleWare_1.authMiddleWare, user_1.userHandler);
exports.userRouter = router;
