import mongoose from "mongoose";

interface IUser {
    email: string;
    fullName: string;
    password: string;
    isAdmin: boolean;
    cart: any[];
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
