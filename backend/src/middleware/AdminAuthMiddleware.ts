import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
    isAdmin: boolean;
    id: string;
    email: string;
}

export const AdminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) return res.status(403).json({ message: "Access denied.", success: false });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JWTPayload;

        if (decoded.isAdmin != true) req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token.", success: false });
    }
};
