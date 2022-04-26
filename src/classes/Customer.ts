export default class Customer {
    #Id: string;
    #Name: string;
    #Phone: string;
    #Mail: string;
    #Address: string;
    #Note: string;

    constructor(name?: string, phone?: string, mail?: string, address?: string, note?: string, id?: string) {
        this.#Id = id || '';
        this.#Name = name || '';
        this.#Phone = phone || '';
        this.#Mail = mail || '';
        this.#Address = address || '';
        this.#Note = note || '';
    }

    get id(): string {
        return this.#Id;
    }
    set id(id: string) {
        this.#Id = id;
    }


    get name(): string {
        return this.#Name;
    }
    set name(name: string) {
        this.#Name = name;
    }


    get phone(): string {
        return this.#Phone;
    }
    set phone(phone: string) {
        this.#Phone = phone;
    }


    get mail(): string {
        return this.#Mail;
    }
    set mail(mail: string) {
        this.#Mail = mail;
    }


    get address(): string {
        return this.#Address;
    }
    set address(address: string) {
        this.#Address = address;
    }


    get note(): string {
        return this.#Note;
    }
    set note(note: string) {
        this.#Note = note;
    }

    // SHOULD BE REMOVED
    convertToFirestore() {
        return {
            address: this.address,
            id: this.id,
            mail: this.mail,
            name: this.name,
            note: this.note,
            phone: this.phone
        };
    }

    build() {
        return {
            address: this.address,
            id: this.id,
            mail: this.mail,
            name: this.name,
            note: this.note,
            phone: this.phone
        };
    }
}