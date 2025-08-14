// here we need all of our imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbConnect from "./config/mongoose.config.js"
import FoodRouter from "./routes/food.routes.js"

dbConnect()
const app = express()
app.use(cors(), express.json())
app.use('/api', FoodRouter)

dotenv.config()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})