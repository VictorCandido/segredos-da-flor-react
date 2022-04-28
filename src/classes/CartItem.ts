import Product from "./Product";

export default class CartItem {
    #CartItemId: number;
    #Product: Product;
    #Quantid: number;
    #TotalValue: number;

    constructor(product: Product, quantid: number, totalValue: number, cartItemId?: number) {
        this.#CartItemId = cartItemId || 0;
        this.#Product = product;
        this.#Quantid = quantid;
        this.#TotalValue = totalValue;
    }

    get cartItemId(): number {
        return this.#CartItemId;
    }
    set cartItemId(cartItemId: number) {
        this.#CartItemId = cartItemId;
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

    isValid(): boolean {
      if (
        this.product
        && this.quantid
        && this.totalValue
      ) return true;
  
      return false;
    }

    build() {
        return {
            cartItemId: this.cartItemId,
            product: this.product.build(),
            quantid: this.quantid,
            totalValue: this.totalValue
        }
    }
}