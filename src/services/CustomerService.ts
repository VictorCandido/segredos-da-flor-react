import { AxiosResponse } from "axios";
import Customer from "../classes/Customer";
import ResponseMessage from "../classes/ResponseMessage";
import CustomerInterface from "../interfaces/CostumerInterface";
import ICustomerModel from "../interfaces/ICustomer";
import Axios from "./Axios";

export default class CustomerService implements CustomerInterface {
    constructor() { }

    async listAll(): Promise<ICustomerModel[]> {
        try {
            const result = await Axios.get<ResponseMessage<ICustomerModel[]>>('/customers');
            const { success, data, message } = result.data;
            
            if (success) {
                return data;
            }
            
            throw new Error(message);
        } catch (error) {
            console.log('[ERROR] - Fail at list all customers - listAll - CustomerService')
            console.dir(error);
            throw error;
        }
    }

    async store(customer: Customer): Promise<ICustomerModel> {
        try {
            let result: AxiosResponse<ResponseMessage<ICustomerModel>, any>;

            if (customer?.id) {
                result = await Axios.put<ResponseMessage<ICustomerModel>>(`/customers/${customer?.id}`, customer.build());
            } else {
                result = await Axios.post<ResponseMessage<ICustomerModel>>('/customers', customer.build());
            }

            const { success, data, message } = result.data;

            if (success) {
                return data;
            }

            throw new Error(message);
        } catch (error) {
            console.log('[ERROR] - Fail at save customer - store - CustomerService')
            console.dir(error);
            throw error;
        }
    }
    
    async delete(customer: Customer): Promise<void> {
        try {
            const result = await Axios.delete<ResponseMessage<any>>(`/customers/${customer.id}`);
            const { success, message } = result.data;

            if (!success) {
                throw new Error(message);
            }
        } catch (error) {
            console.log('[ERROR] - Fail at delete customer - delete - CustomerService')
            console.dir(error);
            throw error;
        }
    }
}