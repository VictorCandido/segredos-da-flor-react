import Product from "../classes/Product";

export default interface ProductContextInterface {
    searchProduct: string;
    setSearchProduct: (searchProduct: string) => void;
    filterSearchProducts: (productsData: Product[]) => Product[];
    getAllProducts: () => Promise<Product[]>;
    saveProduct: (product: Product) => Promise<Product | undefined>;
    deleteProduct: (product: Product) => Promise<void>;
    handleWithCurrencyValue: (value: string) => number;
}