import mongoose from "mongoose";

interface IProduct {
    title: string;
    inStock: boolean;
    description: string;
    media: string;
    price: number;
    status: string;
}

const productSchema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
    },
    media: {
        type: mongoose.Schema.Types.Mixed,
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    status: {
        type: String,
        enum: ["active", "unactive", "deleted"],
        default: "active",
    },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
