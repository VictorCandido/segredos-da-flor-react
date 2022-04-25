import mongoose from "mongoose";
import ICartModel from "../interfaces/ICart";

const CartSchema = new mongoose.Schema<ICartModel>({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    totalValue: { type: Number, required: true },
});

const CartModel = mongoose.models.Cart || mongoose.model<ICartModel>('Cart', CartSchema);

export default CartModel;