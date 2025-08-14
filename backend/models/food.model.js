import mongoose from "mongoose"

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must enter a food"]
    },
    expirationDate:{
        type: Date,
        required: [true, "You must enter an expiration date"]
    },
}, {timestamps: true})

export default mongoose.model("Food", FoodSchema)