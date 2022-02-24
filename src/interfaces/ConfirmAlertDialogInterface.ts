import { ReactElement } from "react";

export default interface ConfirmAlertDialogInterface {
    isOpen: boolean
    title: string;
    message: ReactElement<any, any>;
    cancelButtonMessage?: string;
    confirmButtonMessage?: string;
    onClose: () => void;
    confirmButtonOnClick: () => void;
    cancelButtonOnClick: () => void;
}