import userModel from "../models/userModels.js";
import  mongoose from "mongoose";



// Add to Cart
const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: "Error Adding to Cart", error: error.message });
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: "Error Removing from Cart"});
    }
}    
// Fetch User cart Data
const getCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: "Error Fetching Cart Data"});
    }
}

export { addToCart, removeFromCart, getCart };