import mongoose from "mongoose";

const connectDB = async () =>{
    const MONGODB_URL = `mongodb+srv://JAYAVEL:jaya2005vel@cluster0.pghxx.mongodb.net/express`;
    await mongoose.connect(MONGODB_URL).then(()=>{
        console.log("MongoDB connected successfully");
    })
}


export default connectDB;