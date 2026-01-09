import express from "express";
import createTokenForUser from "../utils/createtoken.js";
import User from "../models/user.js";

const router = express.Router();


router.post('/login', async(req, res) => {

    try {
        const {username, password} = req.body;

        const user = await User.findOne({username}).select("+passwordHash");
        if (!user) return res.status(401).json({ error: "Invalid credentials"});

        const ok = await user.comparePassword(password);
        if (!ok) return res.status(401).json({ error: "Invalid credentials"});

        const token = createTokenForUser(user);

        res.status(200).json({
            message: "Sucessfully Logged In",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,    
            }
        })
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
})



export default router;