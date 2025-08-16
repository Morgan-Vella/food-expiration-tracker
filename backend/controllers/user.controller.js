import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserController = {
    "register": async (req, res) => {
        try{
            const newUser = await User.create(req.body)
            res.json({"message": "User created successfully"})
        } catch (err) {
            res.status(400).json(err)
        }
    },
    "login": async (req, res) =>{ 
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) return res.status(401).json({error: "User not found."});
            
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(401).json({error: "User not found."})

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"}) 

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({message: 'Login Succesful'}, user.select("-password"));
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    },
    "logout": async (req, res) => {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true
        });
        res.json({message: "Logout Successful"});
    },
    "verify": async (req, res) => {
        try{
            const user = await User.findById(req.user).select("-password");
            if( !user ) return res.status(404).json({message: "User not found."});
            res.json(user)
        } catch(err) {
            console.error(err)
            res.status(500).json({message: "Server error"})
        }
    }
}

export default UserController
