import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

connectDB(); // Make sure DB connects before handling requests

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req,res)=>{
    res.send("API Working...");
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));






//mongodb+srv://kami:<db_password>@cluster007.zror1yy.mongodb.net/?