import Sale from "../classes/Sale";

export default interface SaleContextInterface {
    calculateTotals: (sale: Sale) => Sale;
    confirmSale: (sale: Sale) => Promise<void>;
}