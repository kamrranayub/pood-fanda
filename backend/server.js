import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

connectDB(); // Make sure DB connects before handling requests

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRouter);

app.get("/", (req,res)=>{
    res.send("API Working...");
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));






//mongodb+srv://kami:<db_password>@cluster007.zror1yy.mongodb.net/?