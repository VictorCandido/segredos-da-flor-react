import React, { useContext, useState } from 'react';
import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import NavbarHeader from './NavbarHeader';
import MenuSidebarInterface from '../interfaces/MenuSidebarInterface';
import { NavigateContext } from '../contexts/NavigateContext';

export default function MenuSidebar({ children }: MenuSidebarInterface) {
  const { openSidebar, setOpenSidebar } = useContext(NavigateContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        openSidebar={ openSidebar }
        display={{ base: 'none', md: 'block' }}
        mainMenu
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} openSidebar={ openSidebar } />
        </DrawerContent>
      </Drawer>

      {/* NavbarHeader */}
      <NavbarHeader toggleMenu={ () => setOpenSidebar(!openSidebar) } openSidebar={ openSidebar } onOpen={onOpen} />
      <Box transition="0.4s ease" ml={{ base: 'full', md: openSidebar ? '240px' : '75px' }} p="4">
        {children}
      </Box>
    </Box>
  );
}