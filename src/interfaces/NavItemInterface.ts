import { FlexProps } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";

export default interface NavItemInterface extends FlexProps {
    icon: IconType;
    children: ReactText;
    openSidebar: boolean;
    path: string;
    active?: boolean;
}