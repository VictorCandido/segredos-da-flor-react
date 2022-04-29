import Product from "../classes/Product";

export default interface ProductContextInterface {
    searchProduct: string;
    setSearchProduct: (searchProduct: string) => void;
    filterSearchProducts: (productsData: Product[]) => Product[];
    listAllProducts: () => Promise<Product[]>;
    saveProduct: (product: Product) => Promise<Product>;
    deleteProduct: (product: Product) => Promise<void>;
}