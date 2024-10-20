import {z} from "zod"

export const ruleSchema = z.object({
    id: z.number().optional(),
    ruleString : z.string().min(1, "rule string must be present"),
    ast : z.string().min(1, "ast can not be empty")
})

export const validateRule = (data:any)=>{
  try {
    return ruleSchema.parse(data)
  } catch (error:any) {
    console.log({error : error.message})
    return null
  }
}