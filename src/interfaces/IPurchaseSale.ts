import { Document } from 'mongoose';
import ISale from "./ISale";

export enum PurchaseSaleTypeEnum { 
    PURCHASE = 'purchase', 
    SALE = 'sale' 
};

export interface IPurchaseSale {
    type: PurchaseSaleTypeEnum;
    currentDate: Date;
    data: ISale;
}

export default interface IPurchaseSaleModel extends IPurchaseSale, Document {}