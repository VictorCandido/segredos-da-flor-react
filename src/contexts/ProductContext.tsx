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
        try {
            const products = await productService.listAll();
            return sortProducts(products.map(product => new Product(product.code, product.name, product.purchaseValue, product.saleValue, product.isProduct, product._id)));
        } catch (error) {
            console.log('[ERROR] - Fail at list all products - listAllProducts - ProductContext');
            console.dir(error);
            throw error;
        }
    }

    async function saveProduct(product: Product): Promise<Product> {
        try {
            const savedProduct = await productService.store(product);
            return new Product(savedProduct.code, savedProduct.name, savedProduct.purchaseValue, savedProduct.saleValue, savedProduct.isProduct, savedProduct._id);
        } catch (error) {
            console.log('[ERROR] - Fail at save product - saveProduct - ProductContext');
            console.dir(error);
            throw error;
        }
    }

    async function deleteProduct(product: Product): Promise<void> {
        try {
            await productService.delete(product);
        } catch (error) {
            console.log('[ERROR] - Fail at delete product - deleteProduct - ProductContext');
            console.dir(error);
            throw error;
        }
    }

    return (
        <ProductContext.Provider value={ value }>
            { children }
        </ProductContext.Provider>
    )
}