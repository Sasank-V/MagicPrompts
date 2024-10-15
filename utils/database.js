import mongoose from "mongoose";

let isConnected = false; //Track the Connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "SharePrompt",
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB connected");
    }catch(err){
        console.log(err);
    }
}