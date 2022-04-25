import mongoose from "mongoose";
import ISaleModel from "../interfaces/ISale";

const SaleSchema = new mongoose.Schema<ISaleModel>({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cart'
    },
    saleDate: { type: Date, required: true },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    note: String,
    paymentMethod: { type: String, required: true },
    installments: String, // Parcelas
    discountValue: Number,
    discountPercentage: Number,
    discounts: Number,
    netTotal: { type: Number, required: true },  // Total Líquido
    paidTotal: { type: Number, required: true },
    change: Number,
}, { timestamps: true });

const SaleModel = mongoose.models.Sale || mongoose.model<ISaleModel>('Sale', SaleSchema);

export default SaleModel;