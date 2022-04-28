import { AxiosResponse } from 'axios';
import Product from "../classes/Product";
import ResponseMessage from "../classes/ResponseMessage";
import IProductModel from "../interfaces/IProduct";
import ProductInterface from "../interfaces/ProductInterface";
import Axios from "./Axios";

export default class ProductService implements ProductInterface {
    constructor() {  }

    async listAll(): Promise<IProductModel[]> {
        try {
            const result = await Axios.get<ResponseMessage<IProductModel[]>>('/products');
            const { success, data, message } = result.data;
            
            if (success) {
                return data;
            }
            
            throw new Error(message);
        } catch (error) {
            console.log('[ERROR] - Fail at list all products - listAll - ProductService')
            console.dir(error);
            throw error;
        }
    }

    async store(product: Product): Promise<IProductModel> {
        try {
            let result: AxiosResponse<ResponseMessage<IProductModel>, any>;

            if (product?.id) {
                result = await Axios.put<ResponseMessage<IProductModel>>(`/products/${product?.id}`, product.build());
            } else {
                result = await Axios.post<ResponseMessage<IProductModel>>('/products', product.build());
            }

            const { success, data, message } = result.data;

            if (success) {
                return data;
            }

            throw new Error(message);
        } catch (error) {
            console.log('[ERROR] - Fail at save product - store - ProductService')
            console.dir(error);
            throw error;
        }
    }

    async delete(product: Product): Promise<void> {
        try {
            const result = await Axios.delete<ResponseMessage<any>>(`/products/${product.id}`);
            const { success, message } = result.data;

            if (!success) {
                throw new Error(message);
            }
        } catch (error) {
            console.log('[ERROR] - Fail at delete product - delete - ProductService')
            console.dir(error);
            throw error;
        }
    }

}