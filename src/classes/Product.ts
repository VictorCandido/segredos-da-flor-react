export default class Product {
    #Id: string;
    #Code: string;
    #Name: string;
    #PurchaseValue: number;
    #SaleValue: number;
    #IsProduct: boolean;

    constructor(code?: string, name?: string, purchaseValue?: number, salveValue?: number, isProduct?: boolean, id?: string) {  
        this.#Id = id || '';
        this.#Code = code || '';
        this.#Name = name || '';
        this.#PurchaseValue = purchaseValue || 0;
        this.#SaleValue = salveValue || 0;
        this.#IsProduct = isProduct || false;
    }

    get id(): string {
        return this.#Id;
    }
    set id(id: string) {
        this.#Id = id;
    }

    get code(): string {
        return this.#Code;
    }
    set code(code: string) {
        this.#Code = code;
    }

    get name(): string {
        return this.#Name;
    }
    set name(name: string) {
        this.#Name = name;
    }

    get purchaseValue(): number {
        return this.#PurchaseValue;
    }
    set purchaseValue(purchaseValue: number) {
        this.#PurchaseValue = purchaseValue;
    }

    get saleValue(): number {
        return this.#SaleValue;
    }
    set saleValue(saleValue: number) {
        this.#SaleValue = saleValue;
    }

    get isProduct(): boolean {
        return this.#IsProduct;
    }
    set isProduct(isProduct: boolean) {
        this.#IsProduct = isProduct;
    }

    build() {
        return {
            code: this.code,
            _id: this.id,
            isProduct: this.isProduct,
            name: this.name,
            purchaseValue: this.purchaseValue,
            saleValue: this.saleValue,
        };
    }
}