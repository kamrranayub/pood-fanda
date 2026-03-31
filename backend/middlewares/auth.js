import jwt from "jsonwebtoken";

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({ success: false, message: "No Authorized, Login Again" });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Invalid Token" });  
    }
}






export default authMiddleware;