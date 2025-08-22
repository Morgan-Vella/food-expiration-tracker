import Food from "../models/food.model.js";

const FoodController = {
    "create": async (req, res) => {
        try {
            const newFood = await Food.create({ ...req.body, user: req.user });
            res.json(newFood);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
    "getAll": async (req, res) => {
        try {
            const allFood = await Food.find({ user: req.user }).sort({ expirationDate: 1 });
            res.json(allFood)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    "expiringSoon": async (req, res) => {
        //get todays date
        const today = new Date();
        today.setHours(0, 0, 0, 0) // this will be start of that day(midnight)
        // get date 3 days from now
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setHours(23, 59, 59, 999) // this will be the end of the last day
        threeDaysFromNow.setDate(today.getDate() + 3);
        try {
            const expiringSoon = await Food.find({
                user: req.user,
                expirationDate: {
                    //$gte: greater than or equal to -> means today or later
                    $gte: today,
                    //$lte: less than or equal to -> means 3 days from now or earlier 
                    $lte: threeDaysFromNow
                }
            }).sort({ expirationDate: 1 })
            res.json(expiringSoon)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    "delete": async (req, res) => {
        try {
            const deletedFood = await Food.findByIdAndDelete({ _id: req.params.id, user: req.user });
            if (!deletedFood) {
                return res.status(404).json({ message: "Food Item Not Found" })
            }
            res.json({ message: "Food Deleted Successfully" })
        } catch (err) {
            res.status(400).json(err)
        }
    },
    "search": async (req, res) => {
        try {
            const { q } = req.query;
            const searchResults = await Food.find({
                user: req.user,
                name: { $regex: q, $options: "i" } // "i" makes it case insensitive
            }).limit(20).sort({ expirationDate: 1 });

            res.json(searchResults);
        } catch (err) {
            res.status(500).json(err)
        }
    }
};

export default FoodController