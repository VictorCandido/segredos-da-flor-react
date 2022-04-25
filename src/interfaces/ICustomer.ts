import { Document } from 'mongoose';

export interface ICustomer {
    name: string;
    phone: string;
    mail: string;
    address: string;
    note: string;
}

export default interface ICustomerModel extends ICustomer, Document {}