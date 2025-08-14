import expresse from "express"
import FoodController from "../controllers/food.controller.js"

const FoodRouter = expresse.Router()
FoodRouter.route("/food")
    .post(FoodController.create)
    .get(FoodController.getAll)

export default FoodRouter