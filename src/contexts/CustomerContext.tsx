import { createContext, useState } from "react";
import Customer from "../classes/Customer";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import CustomerContextInterface from "../interfaces/CustomerContextInterface";
import CustomerService from "../services/CustomerService";

export const CustomerContext = createContext({} as CustomerContextInterface);

export function CustomerProvider({ children }: ContextProviderInterface) {
    const [ searchCustomer, setSearchCustomer ] = useState('');
    
    const customerService = new CustomerService();

    const value = {
        searchCustomer,
        setSearchCustomer,
        filterSearchCustomers,
        getAllCustomers,
        saveCustomer,
        deleteCustomer
    };

    function filterSearchCustomers(customersData: Customer[]): Customer[] {
        if (!customersData) return [];
        if (!searchCustomer) return customersData;
    
        return customersData.filter((customer: Customer) => {
          function validate(value: string, param: string): boolean {
            return value.toLowerCase().includes(param.toLowerCase());
          }
    
          if (
            validate(String(customer.name), searchCustomer)
            || validate(String(customer.phone), searchCustomer)
            || validate(String(customer.mail), searchCustomer)
            || validate(String(customer.address), searchCustomer)
            || validate(String(customer.note), searchCustomer)
          ) return true;
      
          return false;
        });
    }

    function sortCustomers(customers: Customer[]): Customer[] {
        return customers.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    async function getAllCustomers(): Promise<Customer[]> {
        const customers = await customerService.getAll();
        return sortCustomers(customers);
    }

    async function saveCustomer(customer: Customer): Promise<Customer | undefined> {
        const savedCustomer = await customerService.store(customer);
        return savedCustomer;
    }

    async function deleteCustomer(customer: Customer): Promise<void> {
        await customerService.delete(customer);
    }

    return (
        <CustomerContext.Provider value={ value }>
            { children }
        </CustomerContext.Provider>
    )
}