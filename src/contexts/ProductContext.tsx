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
        getAllProducts,
        saveProduct,
        deleteProduct,
        handleWithCurrencyValue    
    };

    /**
     * Receives a string number with mask and removes its mask
     * @param value string value with mask
     * @returns currency value in number without mask
     */
    function handleWithCurrencyValue(value: string): number {
      value = value.replaceAll('R$', '');
      value = value.replaceAll('.', '');
      value = value.replaceAll(',', '.');
      return Number(value)
    }

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

    async function getAllProducts(): Promise<Product[]> {
        const products = await productService.getAll();
        return sortProducts(products);
    }

    async function saveProduct(product: Product): Promise<Product | undefined> {
        const savedProduct = await productService.store(product);
        return savedProduct;
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