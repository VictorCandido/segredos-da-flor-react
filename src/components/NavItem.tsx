import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import NavItemInterface from "../interfaces/NavItemInterface";
import { useRouter } from "next/router";


const NavItem = ({ icon, children, openSidebar, active, path, ...rest }: NavItemInterface) => {
    const router = useRouter();

    function dealWithPath() {
        router.push(path);
    }

    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
            onClick={ dealWithPath }
            transition="0.4s ease"
            align="center"
            display="flex"
            justifyContent={ openSidebar ? "start" : "center" }
            p="4"
            mx={ openSidebar ? "4" : "2" }
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
            bg: 'cyan.400',
            color: 'white',
            }}
            fontWeight={active ? 'bold' : 'normal'}
            {...rest}
        >
            {icon && (
            <Icon
                mr={ openSidebar ? "4" : "0" }
                fontSize="16"
                _groupHover={{
                color: 'white',
                }}
                as={icon}
            />
            )}
            { openSidebar ? <Text color="gray.900">{ children }</Text> : null }
        </Flex>
        </Link>
    );
};

export default NavItem;