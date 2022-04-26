export default class ResponseMessage<T> {
    #Success: boolean;
    #Code: number;
    #Message: string;
    #Data: T;

    constructor(success: boolean, code: number,  message: string, data?: T) {
        this.#Success = success;
        this.#Code = code;
        this.#Message = message;
        this.#Data = data || {} as T;
    }

    get success(): boolean {
        return this.#Success;
    }

    set success(success: boolean) {
        this.#Success = success;
    }

    get code(): number {
        return this.#Code;
    }

    set code(code: number) {
        this.#Code = code;
    }

    get message(): string {
        return this.#Message;
    }

    set message(message: string) {
        this.#Message = message;
    }

    get data(): T {
        return this.#Data;
    }

    set data(data: T) {
        this.#Data = data;
    }

    build() {
        return {
            success: this.success,
            message: this.message,
            data: this.data
        }
    }
}