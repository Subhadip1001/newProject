import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        default: ""
    }
});

const User = mongoose.model("user", userSchema);
export default User;