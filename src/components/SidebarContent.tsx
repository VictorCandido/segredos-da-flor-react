import { Box, CloseButton, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { FiHome, FiShoppingCart, FiUsers } from "react-icons/fi";
import { MdAttachMoney } from 'react-icons/md';
import { FaBoxes } from 'react-icons/fa';
import NavItem from "./NavItem";
import { NavigateContext } from "../contexts/NavigateContext";
import { useContext } from "react";
import LinkItemInterface from "../interfaces/LinkItemInterface";
import SidebarInterface from "../interfaces/SidebarInterface";

const SidebarContent = ({ onClose, openSidebar, mainMenu, ...rest }: SidebarInterface) => {
    const { selectedPage } = useContext(NavigateContext);

    const LinkItems: Array<LinkItemInterface> = [
        { key: 'home', name: 'Home', icon: FiHome, path: '/' },
        { key: 'comprar', name: 'Comprar', icon: FiShoppingCart, path: '/comprar' },
        { key: 'vender', name: 'Vender', icon: MdAttachMoney, path: '/vender' },
        { key: 'produtos', name: 'Produtos', icon: FaBoxes, path: '/produtos' },
        { key: 'clientes', name: 'Clientes', icon: FiUsers, path: '/clientes' },
    ];

    return (
        <Box
            transition="0.4s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={openSidebar || !mainMenu ? { base: 'full', md: '240px' } : '75px'}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex alignItems="center" mx={ openSidebar ? "8" : "0" } justifyContent="space-between">
                {/* <Image src='/img/logo2.jpg' alt='Segredos da Flor' transition="0.4s ease" h={ openSidebar ? "10rem" : "5rem" }/> */}
                <Image src='/img/fluig.jpeg' alt='Segredos da Flor' transition="0.4s ease" h={ openSidebar ? "10rem" : "5rem" }/>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem path={link.path} active={ link.key === selectedPage.key } openSidebar={ openSidebar } key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default SidebarContent;