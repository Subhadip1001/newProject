import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async(req, res)=>{
    try {
        const {userName, password, bio} = req.body || {};
        
        if (!userName || !password) {
            return res.status(400).json({msg: "Username and password are required"});
        }

        const findUser = await User.findOne({userName});
        if(findUser){
            return res.status(400).json({msg:"User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = new User({
            userName,
            password: hashPassword,
            bio
        });
        await createUser.save();
        
        const token = jwt.sign({ id: createUser._id }, process.env.JWT_Secret, { expiresIn: '30d' });
        
        return res.status(200).json({
            msg: "User created successfully", 
            token,
            user: {
                _id: createUser._id,
                userName: createUser.userName,
                bio: createUser.bio
            }
        });
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(500).json({msg:"Internal server error"});
    }
};

export const login = async(req, res)=>{
    try {
        const {userName, password} = req.body || {};

        if (!userName || !password) {
            return res.status(400).json({msg: "Username and password are required"});
        }

        const findUser = await User.findOne({userName});
        if(!findUser){
            return res.status(400).json({msg:"Invalid username or password!"});
        }
        
        const isMatch = await bcrypt.compare(password, findUser.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid username or password!"});
        }

        const token = jwt.sign({ id: findUser._id }, process.env.JWT_Secret, { expiresIn: '30d' });

        return res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                _id: findUser._id,
                userName: findUser.userName,
                bio: findUser.bio
            }
        });
    } catch (error) {
        console.log("Error: ",error.message);
        return res.status(500).json({msg:"Internal server error"});
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};