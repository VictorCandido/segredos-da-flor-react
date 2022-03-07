import Product from "../classes/Product";

export default interface SellContextInterface {
    getAllProducts: () => Promise<Product[]>;
}