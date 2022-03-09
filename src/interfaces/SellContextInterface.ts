import Product from "../classes/Product";
import Sale from "../classes/Sale";

export default interface SellContextInterface {
    getAllProducts: () => Promise<Product[]>;
    calculateTotals: (sale: Sale) => Sale;
    confirmSale: (sale: Sale) => Promise<void>;
}