import Customer from "./Customer";

export default class CustomerAsOption {
    #Customer: Customer;
    #Value: string;
    #Label: string;

    constructor(customer: Customer, value: string, label: string) {
        this.#Customer = customer;
        this.#Value = value;
        this.#Label = label;
    }

    get customer(): Customer {
        return this.#Customer;
    }
    set customer(customer: Customer) {
        this.#Customer = customer;
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