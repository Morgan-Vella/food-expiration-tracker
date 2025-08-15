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
    "expiringSoon": async(req,res) => {
        //get todays date
        const today = new Date();
        // get date 3 days from now
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 3);
        try{
            const expiringSoon = await Food.find({
                expirationDate: {
                    //$gte: greater than or equal to -> means today or later
                    $gte: today,
                    //$lte: less than or equal to -> means 3 days from now or earlier 
                    $lte: threeDaysFromNow
                }
            }).sort({expirationDate: 1})
            res.json(expiringSoon)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    "delete": async (req, res) => {
        try{
            const deletedFood = await Food.findByIdAndDelete(req.params.id);
            if ( !deletedFood ){
                return res.status(404).json({message: "Food Item Not Found"})
            }
            res.json({message:"Food Deleted Successfully"})
        } catch (err) {
            res.status(400).json(err)
        }
    }
};

export default FoodController