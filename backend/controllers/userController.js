import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Checking is User already exists?
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Email already registered" })
        }

        //email formating and strong passwornd validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email, Please Enter Valid Emial." })
        }

        if (password.length<8) {
            return res.json({ success: false, message: "Weak Password, Please Enter Strong Password." })
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        const token = createToken(savedUser._id);

        res.json({ success: true, message: "User Registered Successfully", token });
    }
    catch (error) {
        console.error("Error Registering User:", error);
        res.json({ success: false, message: "Error Registering User", error: error.message });
    }


}


export { registerUser, loginUser };