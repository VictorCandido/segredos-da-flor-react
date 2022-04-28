import PurchaseSale from "../classes/PurchaseSale";
import { IPurchaseSale } from "./IPurchaseSale";

export default interface PurchaseSaleInterface {
    registerSaleOnDatabase(purchaseSale: PurchaseSale): Promise<IPurchaseSale>;
}