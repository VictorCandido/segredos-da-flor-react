import mongoose from "mongoose";
import ICartItemModel from "../interfaces/ICartItem";

const CartItemSchema = new mongoose.Schema({
    cartItemId: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantid: { type: Number, required: true },
    totalValue: { type: Number, required: true },
});

const CartItemModel = mongoose.models.CartItem || mongoose.model<ICartItemModel>('CartItem', CartItemSchema);

export default CartItemModel;