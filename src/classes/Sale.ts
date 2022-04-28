import Cart from "./Cart";
import Customer from "./Customer";

export default class Sale {
    #Cart: Cart;
    #SaleDate: Date;
    #Customer: Customer;
    #Note: string;
    #PaymentMethod: string;
    #Installments: string; // Parcelas
    #DiscountValue: number;
    #DiscountPercentage: number;
    #Discounts: number;
    #NetTotal: number;  // Total Líquido
    #PaidTotal: number;
    #Change: number;

    constructor(cart?: Cart, saleDate?: Date, customer?: Customer, note?: string, paymentMethod?: string, installments?: string, discountValue?: number, discountPercentage?: number, discounts?: number, netTotal?: number, paidTotal?: number, change?: number) {
        this.#Cart = cart || new Cart([], 0);
        this.#SaleDate = saleDate || new Date();
        this.#Customer = customer || new Customer();
        this.#Note = note || '';
        this.#PaymentMethod = paymentMethod || '';
        this.#Installments = installments || '';
        this.#DiscountValue = discountValue || 0;
        this.#DiscountPercentage = discountPercentage || 0;
        this.#Discounts = discounts || 0;
        this.#NetTotal = netTotal || 0;
        this.#PaidTotal = paidTotal || 0;
        this.#Change = change || 0;
    }

    get cart(): Cart {
        return this.#Cart;
    }
    set cart(cart: Cart) {
        this.#Cart = cart;
    }

    get saleDate(): Date {
        return this.#SaleDate;
    }
    set saleDate(saleDate: Date) {
        this.#SaleDate = saleDate;
    }

    get customer(): Customer {
        return this.#Customer;
    }
    set customer(customer: Customer) {
        this.#Customer = customer;
    }

    get note(): string {
        return this.#Note;
    }
    set note(note: string) {
        this.#Note = note;
    }

    get paymentMethod(): string {
        return this.#PaymentMethod;
    }
    set paymentMethod(paymentMethod: string) {
        this.#PaymentMethod = paymentMethod;
    }

    get installments(): string {
        return this.#Installments;
    }
    set installments(installments: string) {
        this.#Installments = installments;
    }

    get discountValue(): number {
        return this.#DiscountValue;
    }
    set discountValue(discountValue: number) {
        this.#DiscountValue = discountValue;
    }

    get discountPercentage(): number {
        return this.#DiscountPercentage;
    }
    set discountPercentage(discountPercentage: number) {
        this.#DiscountPercentage = discountPercentage;
    }

    get discounts(): number {
        return this.#Discounts;
    }
    set discounts(discounts: number) {
        this.#Discounts = discounts;
    }

    get netTotal(): number {
        return this.#NetTotal;
    }
    set netTotal(netTotal: number) {
        this.#NetTotal = netTotal;
    }

    get paidTotal(): number {
        return this.#PaidTotal;
    }
    set paidTotal(paidTotal: number) {
        this.#PaidTotal = paidTotal;
    }

    get change(): number {
        return this.#Change;
    }
    set change(change: number) {
        this.#Change = change;
    }

    build() {
        return {
            cart: this.cart.build(),
            saleDate: this.saleDate,
            customer: this.customer.build(),
            note: this.note,
            paymentMethod: this.paymentMethod,
            installments: this.installments,
            discountValue: this.discountValue,
            discountPercentage: this.discountPercentage,
            discounts: this.discounts,
            netTotal: this.netTotal,
            paidTotal: this.paidTotal,
            change: this.change
        };
    }
}