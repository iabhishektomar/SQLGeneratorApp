import express, { Application, Request, Response} from "express"
import cors from "cors"
import { Configuration, OpenAIApi} from "openai"
import * as dotenv from "dotenv"
dotenv.config()
const PORT:number = 8000

//express setup
const app: Application = express()
app.use(cors())
app.use(express.json())

//openai api setup
const API_KEY = process.env.API_KEY
const configuration = new Configuration({
    apiKey: API_KEY
})
const openai = new OpenAIApi(configuration)


app.listen(PORT, ()=>console.log(`Your server is running on PORT ${PORT}`))

app.post("/sql", async(req:Request, res:Response)=>{
    try {
        const answer = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user", content: "Create an SQL request to " + req.body.message}]
        })
        res.send(answer.data.choices[0].message)
    } 
    
    catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})
