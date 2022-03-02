import Product from "./Product";

export default class ProductAsOption {
    #Product: Product;
    #Value: string;
    #Label: string;

    constructor(product: Product, value: string, label: string) {
        this.#Product = product;
        this.#Value = value;
        this.#Label = label;
    }

    get product(): Product {
        return this.#Product;
    }
    set product(product: Product) {
        this.#Product = product;
    }

    get value(): string {
        return this.#Value;
    }
    set value(value: string) {
        this.#Value = value;
    }

    get label(): string {
        return this.#Label;
    }
    set label(label: string) {
        this.#Label = label;
    }
}