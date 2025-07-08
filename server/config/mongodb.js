// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const connectDB = async () => {
//     mongoose.connection.on("connected", async () => {
//         console.log("MongoDB connected successfully");
    
//     await mongoose.connect(`${process.env.MONGODB_URI}`)
//     });
    
// };

// // export default connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
