import Product from "./Product";

export default class CartItem {
    #Id: number;
    #Product: Product;
    #Quantid: number;
    #TotalValue: number;

    constructor(id?: number, product?: Product, quantid?: number, totalValue?: number) {
        this.#Id = id || 0;
        this.#Product = product || new Product();
        this.#Quantid = quantid || 0;
        this.#TotalValue = totalValue || 0;
    }

    get id(): number {
        return this.#Id;
    }
    set id(id: number) {
        this.#Id = id;
    }

    get product(): Product {
        return this.#Product;
    }
    set product(product: Product) {
        this.#Product = product;
    }

    get quantid(): number {
        return this.#Quantid;
    }
    set quantid(quantid: number) {
        this.#Quantid = quantid;
    }

    get totalValue(): number {
        return this.#TotalValue;
    }
    set totalValue(totalValue: number) {
        this.#TotalValue = totalValue;
    }
}