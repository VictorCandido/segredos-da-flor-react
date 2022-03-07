import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Textarea, VStack } from "@chakra-ui/react";
import { Select as ChakraSelect  } from '@chakra-ui/react';
import { useContext, useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import Select from 'react-select'
import CurrencyInput from 'react-currency-input';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt', pt);

import Customer from "../classes/Customer";
import Sale from "../classes/Sale";
import CustomerAsOption from "../classes/CustomerAsOption";

import { CustomerContext } from "../contexts/CustomerContext";

import FinishSaleModalInterface from "../interfaces/FinishSaleModalInterface";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import { UtilsContext } from "../contexts/UtilsContext";


export default function FinishSaleModal(props: FinishSaleModalInterface) {
    const [ customerOptions, setCustomerOptions ] = useState<CustomerAsOption[]>([]);
    const [ selectedcustomer, setSelectedcustomer ] = useState<CustomerAsOption>(new CustomerAsOption(new Customer(), '', ''));
    const [ sale, setSale ] = useState<Sale>(new Sale());

    const { getAllCustomers } = useContext(CustomerContext);
    const { handleWithCurrencyValue, handleWithShowCurrencyValue } = useContext(UtilsContext);

    useEffect(() => {
        handleWithListCustomer();
        setSale(new Sale(props.cart));
    }, []);

    /**
     * Update the Selected cartItem state through CartItem Modal.
     * @param event Changed field`s event
     */
    function handleWithFormUpdate(fieldName: string, fieldValue: CustomerAsOption | number | string | Date): void {
        const { 
            cart, 
            saleDate, 
            customer, 
            note, 
            paymentMethod, 
            installments, 
            discountValue, 
            discountPercentage, 
            discounts, 
            netTotal, 
            paidTotal, 
            change 
        } = sale;

        const fieldsEvents: any = {
            'saleDate': () => {
                const date = fieldValue as Date;
                setSale(new Sale(cart, date, customer, note, paymentMethod, installments, discountValue, discountPercentage, discounts, netTotal, paidTotal, change));
            },
            'customer': () => {
                const customerOption = fieldValue as CustomerAsOption;

                setSelectedcustomer(customerOption);
                setSale(new Sale(cart, saleDate, customerOption.customer, note, paymentMethod, installments, discountValue, discountPercentage, discounts, netTotal, paidTotal, change));
            },
            'note': () => setSale(new Sale(cart, saleDate, customer, String(fieldValue), paymentMethod, installments, discountValue, discountPercentage, discounts, netTotal, paidTotal, change)),
            'paymentMethod': () => setSale(new Sale(cart, saleDate, customer, note, String(fieldValue), installments, discountValue, discountPercentage, discounts, netTotal, paidTotal, change)),
            'installments': () => setSale(new Sale(cart, saleDate, customer, note, paymentMethod, String(fieldValue), discountValue, discountPercentage, discounts, netTotal, paidTotal, change)),
            'discountValue': () => setSale(new Sale(cart, saleDate, customer, note, paymentMethod, installments, handleWithCurrencyValue(String(fieldValue)), discountPercentage, discounts, netTotal, paidTotal, change)),
            'discountPercentage': () => {
                const value = String(fieldValue).replace(/^\%/, '');
                setSale(new Sale(cart, saleDate, customer, note, paymentMethod, installments, discountValue, Number(value), discounts, netTotal, paidTotal, change))
            },
            'discounts': () => setSale(new Sale(cart, saleDate, customer, note, paymentMethod, installments, discountValue, discountPercentage, Number(fieldValue), netTotal, paidTotal, change)),
            'netTotal': () => setSale(new Sale(cart, saleDate, customer, note, paymentMethod, installments, discountValue, discountPercentage, discounts, Number(fieldValue), paidTotal, change)),
            'paidTotal': () => setSale(new Sale(cart, saleDate, customer, note, paymentMethod, installments, discountValue, discountPercentage, discounts, netTotal, handleWithCurrencyValue(String(fieldValue)), change)),
            'change': () => setSale(new Sale(cart, saleDate, customer, note, paymentMethod, installments, discountValue, discountPercentage, discounts, netTotal, paidTotal, Number(fieldValue))),
        };
        fieldsEvents[fieldName]();
    }

    /**
     * Custom function to filter only the label from options
     * @param candidate options from select
     * @param input filter value
     * @returns if shoud show the option or not
     */
    function customCustomersFilterOption(candidate: any, input: string): boolean {
        if (input) {
        return candidate.label.toLowerCase().includes(input.toLowerCase());
        }
        return true
    }

    /**
     * Get all customers from database and fill the customer select in the form
     */
    async function handleWithListCustomer(): Promise<void> {
      const customers = await getAllCustomers();
      const customerOptions = customers.map(customer => {
        return new CustomerAsOption(customer, customer.id, customer.name);
      });
  
      setCustomerOptions(customerOptions);
    }
    
    return (
        <Modal
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            size="7xl"
            isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Finalizar Venda</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Flex>
                    <Box w="50%" mr="10px">
                        <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg'>
                            <Heading size="md">Dados da Venda</Heading>

                            <VStack align='stretch' spacing={3} mt={3}>
                                <HStack>
                                    {/* SALE DATE FIELD */}
                                    <FormControl>
                                        <FormLabel>Data da Venda</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <FiCalendar />
                                            </InputLeftElement>
                                            <Input
                                                as={ DatePicker } 
                                                selected={ sale.saleDate } 
                                                locale="pt"
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(event: any) => handleWithFormUpdate('saleDate', event)} 
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    {/* CUSTOMER FIELD */}
                                    <FormControl>
                                        <FormLabel>Cliente</FormLabel>
                                        <Select
                                            placeholder="Digite um cliente..."
                                            isClearable 
                                            options={ customerOptions }
                                            value={ selectedcustomer }
                                            filterOption={ customCustomersFilterOption  }
                                            onChange={ customerOption => handleWithFormUpdate('customer', customerOption as CustomerAsOption) }
                                        />
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    {/* NOTES FIELD */}
                                    <FormControl>
                                        <FormLabel>Observação da Venda</FormLabel>
                                        <Textarea 
                                            value={ sale.note }
                                            onChange={ event => handleWithFormUpdate('note', event.target.value) }
                                        />
                                    </FormControl>
                                </HStack>
                            </VStack>
                        </Box>
                        
                        <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg' mt="10px">
                            <Heading size="md">Dados de Pagamento</Heading>

                            <VStack align='stretch' spacing={3} mt={3}>
                                <HStack>
                                    {/* PAYMENT METHOD FIELD */}
                                    <FormControl>
                                        <FormLabel>Forma de Pagamento</FormLabel>
                                        <ChakraSelect 
                                            placeholder='Forma de Pagamento' 
                                            value={ sale.paymentMethod }
                                            onChange={ event => handleWithFormUpdate('paymentMethod', event.target.value) } 
                                        >
                                            <option value="cash">Dinheiro</option>
                                            <option value="bank_slip">Boleto</option>
                                            <option value="pix">Pix</option>
                                            <option value="credit">Crédito</option>
                                            <option value="debit">Débito</option>
                                        </ChakraSelect>
                                    </FormControl>

                                    { {
                                        'cash': (
                                            <FormControl>
                                                <FormLabel>Valor Pago</FormLabel>
                                                <InputGroup>
                                                    <InputLeftElement pointerEvents='none'>
                                                        <MdOutlineAttachMoney />
                                                    </InputLeftElement>
                                                    <Input 
                                                      as={ CurrencyInput } 
                                                      decimalSeparator="," 
                                                      thousandSeparator="."
                                                      prefix="R$"
                                                      placeholder='Valor Pago' 
                                                      value={ sale.paidTotal }
                                                      onChange={ (event: any) => handleWithFormUpdate('paidTotal', event) }
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                        ),
                                        'credit': (
                                            <FormControl>
                                                <FormLabel>Parcelas</FormLabel>
                                                <ChakraSelect 
                                                    placeholder='Parcelas' 
                                                    value={ sale.installments }
                                                    onChange={ event => handleWithFormUpdate('installments', event.target.value) } 
                                                >
                                                    <option value="1x">À Vista</option>
                                                    <option value="2x">2x</option>
                                                    <option value="3x">3x</option>
                                                    <option value="4x">4x</option>
                                                    <option value="5x">5x</option>
                                                    <option value="6x">6x</option>
                                                    <option value="7x">7x</option>
                                                    <option value="8x">8x</option>
                                                    <option value="9x">9x</option>
                                                    <option value="10x">10x</option>
                                                    <option value="11x">11x</option>
                                                    <option value="12x">12x</option>
                                                </ChakraSelect>
                                            </FormControl>
                                        )
                                    }[sale.paymentMethod] || <FormControl /> }



                                </HStack>
                                <HStack>
                                    {/* DISCOUNT MONEY FIELD */}
                                    <FormControl>
                                        <FormLabel>Desconto (R$)</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <MdOutlineMoneyOffCsred />
                                            </InputLeftElement>
                                            <Input 
                                              as={ CurrencyInput } 
                                              decimalSeparator="," 
                                              thousandSeparator="."
                                              prefix="R$"
                                              placeholder='Desconto (R$)' 
                                              value={ sale.discountValue }
                                              onChange={ (event: any) => handleWithFormUpdate('discountValue', event) }
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    {/* DISCOUNT PERCENT FIELD */}
                                    <FormControl>
                                        <FormLabel>Desconto (%)</FormLabel>
                                        <NumberInput
                                            onChange={(valueString) => handleWithFormUpdate('discountPercentage', valueString)}
                                            value={ sale.discountPercentage + '%' }
                                            max={50}
                                            >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                    
                    <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg' w="50%">
                        <Heading size="md">Total</Heading>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center"mt={2}>
                            <Heading size="sm">SubTotal</Heading>
                            <Text fontSize={20}>{ handleWithShowCurrencyValue(sale.cart.totalValue) }</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Descontos</Heading>
                            <Text fontSize={20}>{ handleWithShowCurrencyValue(sale.discounts) }</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Total Líquido</Heading>
                            <Text fontSize={20}>{ handleWithShowCurrencyValue(sale.netTotal) }</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Total Pago</Heading>
                            <Text fontSize={20}>{ handleWithShowCurrencyValue(sale.paidTotal) }</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Troco</Heading>
                            <Text fontSize={20}>{ handleWithShowCurrencyValue(sale.change) }</Text>
                        </Box>

                        <Box mt={2}>
                            <Button 
                                colorScheme="green" 
                                w="100%"
                                onClick={ () => console.log(sale) }
                            >
                                Confirmar Venda
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
}