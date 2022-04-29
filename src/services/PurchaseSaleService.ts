import { AxiosError } from "axios";
import PurchaseSale from "../classes/PurchaseSale";
import ResponseMessage from "../classes/ResponseMessage";
import { IPurchaseSale } from "../interfaces/IPurchaseSale";
import PurchaseSaleInterface from "../interfaces/PurchaseSaleInterface";
import Axios from "./Axios";

export default class PurchaseSaleService implements PurchaseSaleInterface {
    constructor() {
    }
    
    async registerSaleOnDatabase(purchaseSale: PurchaseSale): Promise<IPurchaseSale> {
        try {
            const result = await Axios.post<ResponseMessage<IPurchaseSale>>('/purchase-sale', purchaseSale.build());

            const { success, data, message } = result.data;

            if (success) {
                return data;
            }

            throw new Error(message);
        } catch (error: any) {
            console.log('[ERROR] - Fail at register sale - registerSaleOnDatabase - PurchaseSaleService')
            console.dir(error);
            throw error?.response?.data || error;
        }
    }
}