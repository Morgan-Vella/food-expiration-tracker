// here we need all of our imports
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import dbConnect from "./config/mongoose.config.js"
import FoodRouter from "./routes/food.routes.js"
import UserRouter from "./routes/user.routes.js"

dbConnect()
const app = express()
app.use(cors({origin:"http://localhost:5173", credentials: true}), express.json(), cookieParser())
app.use('/api', FoodRouter, UserRouter)

dotenv.config()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})