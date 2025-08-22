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
exports.zapFetchHandler = zapFetchHandler;
exports.zapHandler = zapHandler;
exports.getAllZaps = getAllZaps;
const index_1 = require("../db/index");
const index_2 = require("../types/index");
function zapHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const parsedData = index_2.ZapSchema.safeParse(body);
        if (!parsedData.success) {
            return res.status(403).send("Wrong inputs!");
        }
        const Zap = yield index_1.client.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const zap = yield tx.zap.create({
                data: {
                    triggerId: "",
                    //@ts-ignore
                    userId: req.userId,
                    actions: {
                        create: parsedData.data.actions.map((x, index) => ({
                            actionId: x.availableActionId,
                            sortingOrder: index
                        }))
                    }
                }
            });
            const trigger = yield tx.trigger.create({
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId: zap.id
                }
            });
            yield tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });
        }));
        return res.status(200).json(Zap);
    });
}
function getAllZaps(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const zaps = yield index_1.client.zap.findMany({
            where: {
                //@ts-ignore
                userId: req.userId
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });
        return res.status(200).json(zaps);
    });
}
function zapFetchHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const zapId = req.params.zapId;
        const zap = yield index_1.client.zap.findFirst({
            where: {
                //@ts-ignore
                userId: req.userId,
                id: zapId
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });
        return res.status(200).json(zap);
    });
}
