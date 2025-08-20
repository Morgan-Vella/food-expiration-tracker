import express from "express"
import FoodController from "../controllers/food.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"

const FoodRouter = express.Router()
FoodRouter.route("/food")
    .post(authMiddleware, FoodController.create)
    .get(authMiddleware, FoodController.getAll)

FoodRouter.route("/expiring-soon")
    .get(authMiddleware, FoodController.expiringSoon)

FoodRouter.route("/food/:id")
    .delete(authMiddleware, FoodController.delete)  


export default FoodRouter