import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch } from "@chakra-ui/react";
import CurrencyInput from 'react-currency-input';
import ProductRegisterModalInterface from "../interfaces/ProductRegisterModalInterface";

export default function ProductRegisterModal(props: ProductRegisterModalInterface) {
    return (
        <Modal
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            size="4xl"
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Cadastro de Produto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Produto?</FormLabel>
                    <Switch size='lg'  name='isProduct' isChecked={ props.product.isProduct } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Código</FormLabel>
                    <Input placeholder='Código' name='code' value={ props.product.code } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>
                
                <FormControl mt={4}>
                    <FormLabel>Nome</FormLabel>
                    <Input placeholder='Nome' name='name' value={ props.product.name } onChange={event => props.handleWithFormUpdate(event)} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Valor de Compra</FormLabel>
                    <Input 
                        as={ CurrencyInput } 
                        decimalSeparator="," 
                        thousandSeparator="."
                        prefix="R$"
                        placeholder='R$ 00,00' 
                        name='purchaseValue' 
                        value={ props.product.purchaseValue } 
                        onChangeEvent={(event: any) => props.handleWithFormUpdate(event) } 
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Valor de Venda</FormLabel>
                    <Input 
                        as={ CurrencyInput } 
                        decimalSeparator="," 
                        thousandSeparator="."
                        prefix="R$"
                        placeholder='R$ 00,00' 
                        name='saleValue' 
                        value={ props.product.saleValue } 
                        onChangeEvent={(event: any) => props.handleWithFormUpdate(event) } 
                    />
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