import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import ruleRoutes from "./routes/rules.routes"
dotenv.config()
const app = express();

const port  = process.env.PORT as string;
app.use(cors())
app.use(express.json())

app.use("/",(req,res)=>{
    res.send("service is running live");
})
app.use("/api/v1/rules", ruleRoutes)

app.listen(parseInt(port), ()=>{
    console.log("server is running live on port :", port)
})