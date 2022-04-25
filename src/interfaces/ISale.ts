import { Document } from 'mongoose';
import ICartModel from './ICart';
import ICustomerModel from "./ICustomer";

export interface ISale {
    cart: ICartModel;
    saleDate: Date;
    customer: ICustomerModel;
    note: string;
    paymentMethod: string;
    installments: string; // Parcelas
    discountValue: number;
    discountPercentage: number;
    discounts: number;
    netTotal: number;  // Total Líquido
    paidTotal: number;
    change: number;
}
export default interface ISaleModel extends ISale, Document {}