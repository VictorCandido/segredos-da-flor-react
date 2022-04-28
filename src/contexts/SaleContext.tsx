import { createContext } from "react";
import PurchaseSale from "../classes/PurchaseSale";
import Sale from "../classes/Sale";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import { PurchaseSaleTypeEnum } from "../interfaces/IPurchaseSale";
import SaleContextInterface from "../interfaces/SaleContextInterface";
import PurchaseSaleService from "../services/PurchaseSaleService";

export const SaleContext = createContext({} as SaleContextInterface);

export function SaleProvider({ children }: ContextProviderInterface) {

    const purchaseSaleService = new PurchaseSaleService();

    const value = {
        calculateTotals,
        confirmSale
    }

    async function confirmSale(sale: Sale) {
        try {
            const type = PurchaseSaleTypeEnum.SALE;
            const purchaseSale = new PurchaseSale(type, sale);
            await purchaseSaleService.registerSaleOnDatabase(purchaseSale);
        } catch (error) {
            console.log('[ERROR] - Fail at confirm sale - confirmSale - SaleContext')
            console.dir(error);
            throw error;
        }
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
        <SaleContext.Provider value={ value }>
            { children }
        </SaleContext.Provider>
    )
}