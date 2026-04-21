import Tweet from "../models/Tweet.model.js";

export const createTweet = async (req, res)=>{
    try {
        const tweet = await Tweet.create({
            content: req.body.content,
            user: req.user.id
        });
        res.status(201).json(tweet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTweet = async (req, res)=>{
    const { id } = req.params;
    const { content } = req.body;

    try {
        const tweet = await Tweet.findById(id);

        if(!tweet){
            return res.status(404).json({ message: "Tweet not found" });
        }

        if(tweet.user.toString() !== req.user.id){
            return res.status(403).json({ message:" only your tweets"});
        }

        if (content) {
            tweet.content = content;
            await tweet.save();
        }

        return res.status(200).json(tweet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTweet = async (req, res)=>{
    try {
        const tweet = await Tweet.findById(req.params.id);

        if(!tweet) return res.status(404).json({ message:"Tweet not found"});

        if(tweet.user.toString() != req.user.id){
            return res.status(403).json({ message:"User not authorized to delete" });
        }

        await tweet.deleteOne();
        res.json({ message:"Tweet removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find()
            .populate('user', 'userName bio')
            .sort({ createdAt: -1 });
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({ user: req.params.userId })
            .populate('user', 'userName bio')
            .sort({ createdAt: -1 });
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};