import mongoose from "mongoose";
import IPurchaseSaleModel, { PurchaseSaleTypeEnum } from '../interfaces/IPurchaseSale';


const PurchaseSaleSchema = new mongoose.Schema<IPurchaseSaleModel>({ 
    type: {
        type: String,
        enum: PurchaseSaleTypeEnum,
        required: true,
    },
    currentDate: { type: Date, required: true },
    data: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sale'
    },
}, { timestamps: true });

const PurchaseSaleModel = mongoose.models.PurchaseSale || mongoose.model<IPurchaseSaleModel>('PurchaseSale', PurchaseSaleSchema);

export default PurchaseSaleModel;