import expresse from "express"
import FoodController from "../controllers/food.controller.js"

const FoodRouter = expresse.Router()
FoodRouter.route("/food")
    .post(FoodController.create)
    .get(FoodController.getAll)

FoodRouter.route("/expiring-soon")
    .get(FoodController.expiringSoon)

FoodRouter.route("/food/:id")
    .delete(FoodController.delete)  


export default FoodRouter