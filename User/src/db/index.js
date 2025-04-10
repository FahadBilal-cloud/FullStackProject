import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        const connectionInstances =await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
        console.log(`\n MongoDb Connect !! DB Host ${connectionInstances.connection.host}`);
        
    } catch (error) {
        console.log('Failed to Connect to MongoDb',error);
        process.exit(1);
    }
}

export default connectDB;