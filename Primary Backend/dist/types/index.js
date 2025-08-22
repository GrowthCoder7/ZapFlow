"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapSchema = exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6)
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.signinSchema = signinSchema;
const ZapSchema = zod_1.z.object({
    availableTriggerId: zod_1.z.string(),
    triggerMetaDat: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        actionMetaData: zod_1.z.any().optional()
    }))
});
exports.ZapSchema = ZapSchema;
