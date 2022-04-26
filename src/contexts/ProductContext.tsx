import { createContext, useContext, useState } from "react";
import Product from "../classes/Product";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import ProductContextInterface from "../interfaces/ProductContextInterface";
import ProductService from "../services/ProductService";
import { UtilsContext } from "./UtilsContext";

export const ProductContext = createContext({} as ProductContextInterface);

export function ProductProvider({ children }: ContextProviderInterface) {
    const { handleWithShowCurrencyValue } = useContext(UtilsContext);

    const productService = new ProductService();

    const [ searchProduct, setSearchProduct ] = useState('');

    const value = {
        searchProduct,
        setSearchProduct,
        filterSearchProducts,
        listAllProducts,
        saveProduct,
        deleteProduct
    };

    function filterSearchProducts(productsData: Product[]): Product[] {
        if (!productsData) return [];
        if (!searchProduct) return productsData;
    
        return productsData.filter((product: Product) => {
          function validate(value: string, param: string): boolean {
            return value.toLowerCase().includes(param.toLowerCase());
          }

          function trataBoolean(value: boolean): string {
            return value ? 'sim' : 'não';
          }
    
          if (
            validate(String(product.code), searchProduct)
            || validate(String(product.name), searchProduct)
            || validate(handleWithShowCurrencyValue(product.purchaseValue), searchProduct)
            || validate(String(product.purchaseValue), searchProduct)
            || validate(handleWithShowCurrencyValue(product.saleValue), searchProduct)
            || validate(String(product.saleValue), searchProduct)
            || validate(trataBoolean(product.isProduct), searchProduct)
          ) return true;
      
          return false;
        });
    }

    function sortProducts(products: Product[]): Product[] {
        return products.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    async function listAllProducts(): Promise<Product[]> {
        const products = await productService.listAll();
        return sortProducts(products.map(product => new Product(product.code, product.name, product.purchaseValue, product.saleValue, product.isProduct, product._id)));
    }

    async function saveProduct(product: Product): Promise<Product | undefined> {
        const savedProduct = await productService.store(product);
        return new Product(savedProduct.code, savedProduct.name, savedProduct.purchaseValue, savedProduct.saleValue, savedProduct.isProduct, savedProduct._id);
    }

    async function deleteProduct(product: Product): Promise<void> {
        await productService.delete(product);
    }

    return (
        <ProductContext.Provider value={ value }>
            { children }
        </ProductContext.Provider>
    )
}