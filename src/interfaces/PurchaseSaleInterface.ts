import PurchaseSale from "../classes/PurchaseSale";

export default interface PurchaseSaleInterface {
    registerSale(purchaseSale: PurchaseSale): Promise<PurchaseSale | undefined>;
}