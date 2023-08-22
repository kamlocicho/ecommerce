import express, { Request, Response } from "express";
import Product from "../models/Product";
import { AdminAuthMiddleware } from "../middleware/AdminAuthMiddleware";
import AWS from "aws-sdk";

const router = express.Router();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({ status: { $ne: "deleted" } });

        res.status(200).json({ products, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found", success: false });

        res.status(200).json({ product, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

router.post("/", [AdminAuthMiddleware], async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const product = await Product.create({
            ...data,
        });

        if (req.files) {
            console.log(req.files);
            const uploadedImage = await s3
                .upload(
                    {
                        Bucket: "ecom-gen",
                        Key: req.files.media.name,
                        Body: req.files.media.data,
                    },
                    (err: any, data: any) => {
                        if (err) throw err;
                        console.log(data);
                    }
                )
                .promise();

            product.media = uploadedImage.Location;
            await product.save();
        }

        res.status(200).json({ product, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

router.put("/:id", [AdminAuthMiddleware], async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const product = await Product.findByIdAndUpdate(req.params.id, data);
        if (!product) return res.status(404).json({ message: "Product not found", success: false });

        res.status(200).json({ product, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

router.put("/set-status/:id", [AdminAuthMiddleware], async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found", success: false });

        product.status = status;
        await product.save();
        return res.status(201).json({ product, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

export default router;
