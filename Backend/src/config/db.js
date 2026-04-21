import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const con = await mongoose.connect(process.env.MongoDBURI)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;