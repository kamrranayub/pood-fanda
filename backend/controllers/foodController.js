// foodController.js
import fs from "fs";
import mongoose from "mongoose";
import foodModel from "../models/foodModels.js";

const SERVER_URL = "http://localhost:4000"; // Change if deployed

// Add Food
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.status(200).json({ message: "Food Item Added Successfully", food });
    } catch (error) {
        console.error("Error Adding Food Item:", error);
        res.status(500).json({ message: "Error Adding Food Item", error: error.message });
    }
};

// List all food items with full image URL
const listFood = async (req, res) => {
    try {
        const foodList = await foodModel.find({});

        const foodsWithImageURL = foodList.map(food => ({
            _id: food._id,
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
            image: `${SERVER_URL}/images/${food.image}`
        }));

        res.status(200).json(foodsWithImageURL);
    } catch (error) {
        console.error("Error Fetching Food List:", error);
        res.status(500).json({ message: "Error Fetching Food List", error: error.message });
    }
};

// Remove Food
const removeFood = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    try {
        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        const filePath = `uploads/${food.image}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await foodModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Food Item Removed Successfully" });
    } catch (error) {
        console.error("Error Removing Food Item:", error);
        res.status(500).json({ success: false, message: "Error Removing Food Item", error: error.message });
    }
};

export { addFood, listFood, removeFood };


