import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const data = req.body;

        const hashedPassword = await bcrypt.hash(data?.password, 8);

        const user = await User.create({ ...data, password: hashedPassword });

        user.password = "";

        const token = jwt.sign(
            { id: user.id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || "secret"
        );

        res.status(200).json({ token, success: true });
    } catch (error: any) {
        console.log(error);
        if (error.code == 11000)
            return res
                .status(500)
                .json({ message: "User with this email already exists", success: false });
        res.status(500).json({ error, success: false });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({ email: data.email });

        if (!user)
            return res.status(403).json({ message: "This user doesnt exist. ", success: false });

        const passwordsMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordsMatch)
            return res.status(403).json({ message: "This user doesnt exist. ", success: false });

        const token = jwt.sign(
            { id: user.id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || "secret"
        );

        res.status(200).json({ token, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

export default router;
