import { createContext, useState } from "react";
import CurrencyInput from 'react-currency-input';
import Product from "../classes/Product";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import ProductContextInterface from "../interfaces/ProductContextInterface";
import ProductService from "../services/ProductService";

export const ProductContext = createContext({} as ProductContextInterface);

export function ProductProvider({ children }: ContextProviderInterface) {
    const productService = new ProductService();

    const [ searchProduct, setSearchProduct ] = useState('');

    const value = {
        searchProduct,
        setSearchProduct,
        filterSearchProducts,
        getAllProducts,
        saveProduct,
        deleteProduct,
        handleWithCurrencyValue,
        handleWithShowCurrencyValue
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
  
    /**
     * Transforms a number value to a string value with mask
     * @param value number value withou mask
     * @returns string value with mask
     */
    function handleWithShowCurrencyValue(value: number): string {
      let valueString = '';
      
      if (String(value).split('.').length > 1) {
        let valueStringArray = String(value).split('.');
        valueStringArray[1] = valueStringArray[1]?.padEnd(2, '0');
        
        valueString = valueStringArray.join('.');
      } else {
        valueString = String(value);
      }
  
      const props = {
        value: valueString, 
        decimalSeparator: ',',
        thousandSeparator: '.',
        prefix: 'R$'
      }
  
      return CurrencyInput.prototype.prepareProps(props).maskedValue
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