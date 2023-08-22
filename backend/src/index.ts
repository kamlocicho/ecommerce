import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
dotenv.config();

const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;
const host = process.env.HOST ? process.env.HOST : "localhost";

app.use(express.json());
app.use(fileUpload());
app.use(cors({ allowedHeaders: "*" }));

import productsRouter from "./controllers/Products";
import authRouter from "./controllers/Authentication";
import cartRouter from "./controllers/Cart";
import { UserAuthMiddleware } from "./middleware/UserAuthMiddleware";

app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/cart", UserAuthMiddleware, cartRouter);

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Hello world", success: true });
});

app.listen(+port, host, () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("Mongo URI is UNDEFINED");
    mongoose.connect(mongoUri).then(() => {
        console.log(`Application running on port: ${port}`);
    });
});
