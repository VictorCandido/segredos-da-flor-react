import { PurchaseSaleTypeEnum } from "../interfaces/IPurchaseSale";
import Sale from "./Sale";

export default class PurchaseSale {
    #Id: string;
    #Type: PurchaseSaleTypeEnum;
    #CurrentDate: Date;
    #Data: Sale;

    constructor(type: PurchaseSaleTypeEnum, data: Sale, currentDate?: Date, id?: string) {
        this.#Id = id || '';
        this.#Type = type;
        this.#CurrentDate = currentDate || new Date();
        this.#Data = data;
    }

    get id(): string {
        return this.#Id;
    }
    set id(id: string) {
        this.#Id = id;
    }

    get type(): PurchaseSaleTypeEnum {
        return this.#Type;
    }
    set type(type: PurchaseSaleTypeEnum) {
        this.#Type = type;
    }

    get currentDate(): Date {
        return this.#CurrentDate;
    }
    set currentDate(currentDate: Date) {
        this.#CurrentDate = currentDate;
    }

    get data(): Sale {
        return this.#Data;
    }
    set data(data: Sale) {
        this.#Data = data;
    }

    build() {
        return {
            type: this.type,
            currentDate: this.currentDate,
            data: this.data.build()
        }
    }
}