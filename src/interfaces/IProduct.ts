import { Document } from 'mongoose';

export interface IProduct {
    code: string;
    name: string;
    purchaseValue: number;
    saleValue: number;
    isProduct: boolean;
}

export default interface IProductModel extends IProduct, Document {}