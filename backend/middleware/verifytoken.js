import jwt from "jsonwebtoken"
import config from "../config/config.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(403).json({error: "no token provided"});

    try {
        const payload = jwt.verify(token, config.jwtSecret); 
        req.user = { 
            id: payload.userId, 
            username: payload.username
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid or expired' });
    }
}


export default verifyToken;