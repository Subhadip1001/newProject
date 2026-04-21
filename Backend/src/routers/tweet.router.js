import express from "express";
import { createTweet, updateTweet, deleteTweet, getAllTweets, getUserTweets } from "../controllers/tweet.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAllTweets);
router.get("/user/:userId", protect, getUserTweets);
router.post("/", protect, createTweet);
router.delete("/:id", protect, deleteTweet);
router.patch("/:id", protect, updateTweet);

export default router;