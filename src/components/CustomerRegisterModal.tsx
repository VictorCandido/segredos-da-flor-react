import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomerRegisterModalInterface from "../interfaces/CustomerRegisterModalInterface";

export default function CustomerRegisterModal(props: CustomerRegisterModalInterface) {
    return (
        <Modal
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            size="4xl"
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Cadastro de Cliente</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input placeholder='Nome Completo' name='name' value={ props.customer.name } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Telefone</FormLabel>
                    <Input placeholder='(99) 99999-9999' name='phone' value={ props.customer.phone } onChange={event => ( props.handleWithFormUpdate(event) )} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>E-mail</FormLabel>
                    <Input placeholder='E-mail' name='mail' value={ props.customer.mail } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Endereço</FormLabel>
                    <Input placeholder='Endereço' name='address' value={ props.customer.address } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Observação</FormLabel>
                    <Textarea placeholder='Observação' name='note' value={ props.customer.note } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ props.saveButtonOnClick }>
                    Salvar
                </Button>
                <Button onClick={ props.onClose }>
                    Cancelar
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}