import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb://kami:kamran123@ac-kbdpk2t-shard-00-00.zror1yy.mongodb.net:27017,ac-kbdpk2t-shard-00-01.zror1yy.mongodb.net:27017,ac-kbdpk2t-shard-00-02.zror1yy.mongodb.net:27017/pood-fanda?ssl=true&replicaSet=atlas-eyv9xj-shard-0&authSource=admin&retryWrites=true&w=majority'
        );
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Stop server if DB connection fails
    }
};
