import { ChangeEvent } from 'react';
import Product from '../classes/Product';

export default interface ProductRegisterModalInterface {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    saveButtonOnClick: () => void;
    handleWithFormUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}