import express from "express";
import { signup, login, getUserProfile } from "../controllers/user.contoller.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/:id", protect, getUserProfile);

export default userRouter;
