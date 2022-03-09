import { createContext } from "react";
import Product from "../classes/Product";
import Sale from "../classes/Sale";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import SellContextInterface from "../interfaces/SellContextInterface";
import ProductService from "../services/ProductService";

export const SellContext = createContext({} as SellContextInterface);

export function SellProvider({ children }: ContextProviderInterface) {
    const productService = new ProductService();

    const value = {
        getAllProducts,
        calculateTotals
    }

    async function getAllProducts(): Promise<Product[]> {
        const products = await productService.getAll();
        return products;
    }

    function calculateTotals(sale: Sale): Sale {
        if (sale.discountPercentage) {
            const porcentagem = sale.discountPercentage / 100;
            sale.discounts = Number((sale.cart.totalValue * porcentagem).toFixed(2));
        } else if (sale.discountValue) {
            sale.discounts = sale.discountValue;
        } else {
            sale.discounts = 0;
        }
      
        sale.netTotal = Number((sale.cart.totalValue - sale.discounts).toFixed(2));
    
        if (sale.paymentMethod !== 'cash' && sale.paymentMethod !== '') {
            sale.paidTotal = sale.netTotal;
        }
    
        if (sale.paidTotal) sale.change = Number((sale.paidTotal - sale.netTotal).toFixed(2));

        return sale;
    }
    
    return (
        <SellContext.Provider value={ value }>
            { children }
        </SellContext.Provider>
    )
}