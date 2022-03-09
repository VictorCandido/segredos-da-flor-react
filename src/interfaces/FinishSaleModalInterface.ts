import Cart from "../classes/Cart";

export default interface FinishSaleModalInterface {
    isOpen: boolean;
    onClose: (hasConfirmed: boolean) => void;
    cart: Cart;
}