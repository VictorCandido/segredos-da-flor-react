import { Avatar, Box, Divider, Flex, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiSettings, FiUser } from "react-icons/fi";
import { NavigateContext } from "../contexts/NavigateContext";

interface MobileProps extends FlexProps {
    onOpen: () => void;
    toggleMenu: () => void;
    openSidebar: boolean;
  }
  const NavbarHeader = ({ onOpen, toggleMenu, openSidebar, ...rest }: MobileProps) => {
    const { selectedPage } = useContext(NavigateContext);

    return (
      <Flex
        transition="0.4s ease"
        ml={{ base: 0, md: openSidebar ? '240px' : '75px' }}
        px={{ base: 4, md: 4 }}
        height="20"
        width={{ base: 'full', md: openSidebar ? 'calc(100vw - 240px)' : 'calc(100vw - 75px)' }}
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent='space-between'
        {...rest}>
  
        

        <Box display="flex" alignItems="center">
            {/* Botão para abrir menu mobile */}
            <IconButton
                onClick={onOpen}
                display={{ base: 'flex', md: 'none' }}
                variant="ghost"
                aria-label="open menu"
                icon={<FiMenu />}
            />
    
            {/* Botão para abrir menu desktop */}
            <IconButton
                onClick={toggleMenu}
                display={{ base: 'none', md: 'flex' }}
                variant="ghost"
                aria-label="open menu"
                icon={<FiMenu />}
            />
    
            <Divider mx="10px" h="10" orientation="vertical" />

            <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.600"
            >
                { selectedPage.title.toLocaleUpperCase() }
            </Text>
        </Box>
  
        <HStack spacing={{ base: '0', md: '6' }}>

          {/* Notificações */}
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          
          {/* User Menu */}
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://github.com/victorcandido.png'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">Víctor Cândido</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem><FiUser /> <Text ml="10px">Perfil</Text></MenuItem>
                <MenuItem><FiSettings /> <Text ml="10px">Configurações</Text></MenuItem>
                <MenuDivider />
                <MenuItem><FiLogOut /> <Text ml="10px">Sair</Text></MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };

export default NavbarHeader;