import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./src/config/db.js";
import tweetRouter from "./src/routers/tweet.router.js";
import userRouter from "./src/routers/user.router.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
const port = process.env.PORT || 5002;

app.use('/api/tweets', tweetRouter);
app.use('/api/users', userRouter);

app.listen(port, ()=> console.log(`Server is running on ${port}`));
