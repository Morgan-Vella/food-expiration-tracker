import express from "express"
import UserController from "../controllers/user.controller.js"
import authMiddleware from '../middleware/authMiddleware.js'

const UserRouter = express.Router();

UserRouter.route("/register")
    .post(UserController.register)
UserRouter.route("/login")
    .post(UserController.login)
UserRouter.route("/logout")
    .post(UserController.logout)
UserRouter.route("/verify")
    .get(authMiddleware, UserController.verify)

export default UserRouter