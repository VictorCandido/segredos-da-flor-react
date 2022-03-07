import Cart from "../classes/Cart";

export default interface FinishSaleModalInterface {
    isOpen: boolean;
    onClose: () => void;
    cart: Cart;
}