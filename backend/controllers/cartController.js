import userModel from "../models/userModel.js";

// Add to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// Remove from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] -= 1;

            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }

            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "Item not in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// Get user cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving cart" });
    }
};

export { addToCart, removeFromCart, getCart };
