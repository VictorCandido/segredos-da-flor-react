import Product from "../classes/Product";
import IProductModel from "./IProduct";

export default interface ProductInterface {
    listAll(): Promise<Array<IProductModel>>
    store(product: Product): Promise<IProductModel>;
    delete(product: Product): Promise<void>
}