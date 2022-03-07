import { BoxProps } from "@chakra-ui/react";

export default interface SidebarInterface extends BoxProps {
    onClose: () => void;
    openSidebar: boolean;
    mainMenu?: boolean;
}