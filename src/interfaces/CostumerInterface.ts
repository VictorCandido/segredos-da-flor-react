import Customer from "../classes/Customer";
import ICustomerModel from "./ICustomer";

export default interface CustomerInterface {
    listAll(): Promise<ICustomerModel[]>
    store(customer: Customer): Promise<ICustomerModel>;
    delete(customer: Customer): Promise<void>
}