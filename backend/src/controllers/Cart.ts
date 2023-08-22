import express from "express";
import Product from "../models/Product";
import User from "../models/User";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart");
        if (!user)
            return res.status(403).json({ message: "You are not logged in.", success: false });

        return res.status(200).json({ cart: user.cart, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Sorry, there was an error.", success: false });
    }
});

router.put("/:index/remove", async (req, res) => {
    try {
        const { index } = req.params;
        console.log(index);

        const requestUser = req.user;
        const user = await User.findById(requestUser.id);
        if (!user)
            return res.status(403).json({ message: "You are not logged in.", success: false });

        user.cart.splice(+index, 1);
        await user.save();

        res.status(200).json({ message: "Product removed from cart", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Sorry, there was an error.", success: false });
    }
});

router.put("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({ message: "This prodcut doesnt exist.", success: false });
        const requestUser = req.user;
        const user = await User.findById(requestUser.id);
        if (!user)
            return res.status(403).json({ message: "You are not logged in.", success: false });
        user.cart.push(product._id.toString());

        await user.save();
        res.status(200).json({ message: "Product added to card succesfully!", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Sorry, there was an error.", success: false });
    }
});

export default router;
