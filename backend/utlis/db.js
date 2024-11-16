import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connect successfully');
    }
    catch(err) {
        console.log(err);
    }
}


export default connectDB;