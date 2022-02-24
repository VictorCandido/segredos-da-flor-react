import { ChangeEvent } from 'react';
import Customer from "../classes/Customer";

export default interface CustomerRegisterModalInterface {
    customer: Customer;
    isOpen: boolean;
    onClose: () => void;
    saveButtonOnClick: () => void;
    handleWithFormUpdate: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}