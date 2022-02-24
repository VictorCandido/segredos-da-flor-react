import Customer from "../classes/Customer";

export default interface CustomerContextInterface {
    searchCustomer: string;
    setSearchCustomer: (searchCustomer: string) => void;
    filterSearchCustomers: (customersData: Customer[]) => Customer[];
    getAllCustomers: () => Promise<Customer[]>;
    saveCustomer: (customer: Customer) => Promise<Customer | undefined>;
    deleteCustomer: (customer: Customer) => Promise<void>;
}