import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const UserAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).json({ message: "Access denied.", success: false });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token.", success: false });
    }
};
