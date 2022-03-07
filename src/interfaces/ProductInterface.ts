import Product from "../classes/Product";

export default interface ProductInterface {
    getAll(): Promise<Array<Product>>
    store(product: Product): Promise<Product | undefined>;
    delete(product: Product): Promise<void>
}