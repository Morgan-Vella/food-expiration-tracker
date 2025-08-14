import Food from "../models/food.model.js";

const FoodController = {
    "create": async(req, res) => {
        try{
            const newFood = await Food.create(req.body);
            res.json(newFood);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    "getAll": async (req, res) => {
        try{
            const allFood = await Food.find().sort({expirationDate: 1});
            res.json(allFood)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    "getThreeDaysFromNow": async(req,res) => {
        //get todays date
        const today = new Date();
        // get date 3 days from now
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 3);
        try{
            const foodThreeDaysFromNow = await Food.find({
                expirationDate: {
                    //$gte: greater than or equal to -> means today or later
                    $gte: today,
                    //$lte: less than or equal to -> means 3 days from now or earlier 
                    $lte: threeDaysFromNow
                }
            }).sort({expirationDate: 1})
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
}

export default FoodController