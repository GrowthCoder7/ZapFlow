import {z} from "zod"

const signupSchema=z.object({
    name:z.string().min(3),
    email:z.string().min(5),
    password:z.string().min(6)
})

const signinSchema=z.object({
    email:z.string(),
    password:z.string()
})

export{
    signinSchema,
    signupSchema
}
 