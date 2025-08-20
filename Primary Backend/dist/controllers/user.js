"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinHandler = signinHandler;
exports.signupHandler = signupHandler;
exports.userHandler = userHandler;
const index_1 = require("../types/index");
const db_1 = require("../db");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
function signupHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const body = req.body;
        const parsedData = index_1.signupSchema.safeParse(body);
        if (!parsedData.success) {
            res.status(411).json("Wrong inputs!");
        }
        const user = yield db_1.client.user.findFirst({
            where: {
                email: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.email
            }
        });
        if (user) {
            return res.json({
                msg: "User already exists"
            });
        }
        yield db_1.client.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
        return res.status(201).json({
            msg: "User created!"
        });
    });
}
function signinHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const parsedData = index_1.signinSchema.safeParse(body);
        if (!parsedData.success) {
            return res.status(211).json({ msg: "Wrong inputs" });
        }
        const user = yield db_1.client.user.findFirst({
            where: {
                email: parsedData.data.email,
                password: parsedData.data.password
            }
        });
        if (!user)
            return res.status(411).send("Wrong credentials");
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, config_1.JWT_SECRET);
        return res.json({
            token: token
        });
    });
}
function userHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const id = req.userId;
        const user = yield db_1.client.user.findUnique({
            where: {
                id
            },
            select: {
                name: true,
                email: true
            }
        });
        return res.status(200).json({
            user
        });
    });
}
