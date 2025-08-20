import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserController = {
    "register": async (req, res) => {
        try{
            const existingUser = await User.findOne({email: req.body.email});
            if (existingUser) {
                return res.status(400).json({errors: {email: {message: "Email already in use."}}});
            }
            const newUser = await User.create(req.body)
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict", 
                maxAge: 24 * 60 * 60 * 1000
            }); 

            res.json(newUser)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    "login": async (req, res) =>{ 
        try{
            const {email, password} = req.body;
            if (!email || !password ) {
                return res.status(400).json({
                    errors: {
                        email : !email ? "Email is required" : undefined,
                        password: !password? "Password is required" : undefined
                    }
                })
            }
            const user = await User.findOne({email});
            const safeUser = await User.findOne({email}).select("-password")
            if (!user) return res.status(401).json({errors: {email: "User not found."}});
            
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(401).json({errors: {password: "User not found."}})

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"}) 

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json(safeUser);
        } catch (err) {
            res.status(400).json(err);
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
