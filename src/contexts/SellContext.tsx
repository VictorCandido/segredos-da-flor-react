import { createContext } from "react";
import Product from "../classes/Product";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import SellContextInterface from "../interfaces/SellContextInterface";
import ProductService from "../services/ProductService";

export const SellContext = createContext({} as SellContextInterface);

export function SellProvider({ children }: ContextProviderInterface) {
    const productService = new ProductService();

    const value = {
        getAllProducts
    }

    async function getAllProducts(): Promise<Product[]> {
        const products = await productService.getAll();
        return products;
    }
    
    return (
        <SellContext.Provider value={ value }>
            { children }
        </SellContext.Provider>
    )
}