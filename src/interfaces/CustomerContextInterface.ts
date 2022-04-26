import Customer from "../classes/Customer";

export default interface CustomerContextInterface {
    searchCustomer: string;
    setSearchCustomer: (searchCustomer: string) => void;
    filterSearchCustomers: (customersData: Customer[]) => Customer[];
    listAllCustomers: () => Promise<Customer[]>;
    saveCustomer: (customer: Customer) => Promise<Customer>;
    deleteCustomer: (customer: Customer) => Promise<void>;
}