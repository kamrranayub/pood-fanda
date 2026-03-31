import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

// Placing user Order from frontend
const placeOrder = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        // Delivery charge: $2.00 = 200 cents
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Place order error:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// Verify payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful!" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment cancelled" });
        }
    } catch (error) {
        console.error("Verify order error:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// User orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 }).lean();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User orders error:", error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

// List all orders (Admin)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 }).lean();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("List orders error:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// Update order status (Admin)
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.error("Update status error:", error);
        res.json({ success: false, message: "Error updating status" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
