import mongoose from "mongoose";
import IProductModel from "../interfaces/IProduct";

const ProductSchema = new mongoose.Schema<IProductModel>({
    code: {
        type: String,
        required: [true, 'Por favor insira um código.'],
    },
    name: {
        type: String,
        required: [true, 'Por favor insira um nome.'],
    },
    purchaseValue: {
        type: Number,
        required: [true, 'Por favor insira um valor de compra.'],
    },
    saleValue: {
        type: Number,
        required: [true, 'Por favor insira um valor de venda.'],
    },
    isProduct: Boolean,
}, { versionKey: false });

const ProductModel = mongoose.models.Product || mongoose.model<IProductModel>('Product', ProductSchema);

export default ProductModel;