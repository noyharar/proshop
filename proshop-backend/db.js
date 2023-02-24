import mongoose from "mongoose";

const connectDB = async () => {
    try{
        var finalUri = process.env.MONGO_URI;
        const conn = mongoose.connect(finalUri,  { useUnifiedTopology:true, useNewUrlParser: true })
    console.log(`MongoDB connected`)
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
};
export default connectDB