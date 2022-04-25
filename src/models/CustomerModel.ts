import mongoose from "mongoose";
import ICustomerModel from "../interfaces/ICustomer";

const CustomerSchema = new mongoose.Schema<ICustomerModel>({ 
    name: {
        type: String,
        required: [true, 'Por favor insira um nome.'],
    },
    phone: String,
    mail: String,
    address: String,
    note: String
}, { versionKey: false });

const CustomerModel = mongoose.models.Customer || mongoose.model<ICustomerModel>('Customer', CustomerSchema);

export default CustomerModel;