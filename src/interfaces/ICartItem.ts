import { Document } from 'mongoose';
import IProductModel from "./IProduct";

export interface ICartItem {
    cartItemId: number;
    product: IProductModel;
    quantid: number;
    totalValue: number;
}

export default interface ICartItemModel extends ICartItem, Document {}