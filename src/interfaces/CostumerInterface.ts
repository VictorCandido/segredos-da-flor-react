import Customer from "../classes/Customer";

export default interface CustomerInterface {
    getAll(): Promise<Array<Customer>>
    store(customer: Customer): Promise<Customer | undefined>;
    delete(customer: Customer): Promise<void>
}