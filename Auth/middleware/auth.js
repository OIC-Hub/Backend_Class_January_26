const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1];

    const token = req.cookies.token;

    if(!token) {
        // return res.status(401).json({ message: "Access denied, token missing!" });
        res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    }catch (error) {
        console.error(error);
        // res.status(403).json({ message: "Invalid token!" });
        res.redirect("/api/auth/profile");

    }
}


module.exports = authenticateToken;