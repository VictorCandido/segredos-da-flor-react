import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, VStack } from "@chakra-ui/react";
import FinishSaleModalInterface from "../interfaces/FinishSaleModalInterface";

export default function FinishSaleModal(props: FinishSaleModalInterface) {
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
                                    <FormControl>
                                        <FormLabel>Data da Venda</FormLabel>
                                        <Input  placeholder='dd/mm/yyyy' />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Cliente</FormLabel>
                                        <Input  placeholder='Cliente...' />
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>Observação da Venda</FormLabel>
                                        <Textarea />
                                    </FormControl>
                                </HStack>
                            </VStack>
                        </Box>
                        
                        <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg' mt="10px">
                            <Heading size="md">Dados de Pagamento</Heading>

                            <VStack align='stretch' spacing={3} mt={3}>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>Forma de Pagamento</FormLabel>
                                        <Input  placeholder='Forma de Pagamento' />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Valor Pago</FormLabel>
                                        <Input  placeholder='Valor Pago' />
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>Desconto (R$)</FormLabel>
                                        <Input  placeholder='Desconto (R$)' />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Desconto (%)</FormLabel>
                                        <Input  placeholder='Desconto (%)' />
                                    </FormControl>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                    
                    <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg' w="50%">
                        <Heading size="md">Total</Heading>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center"mt={2}>
                            <Heading size="sm">SubTotal</Heading>
                            <Text fontSize={20}>R$ 12,20</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Descontos</Heading>
                            <Text fontSize={20}>R$ 12,20</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Total Líquido</Heading>
                            <Text fontSize={20}>R$ 12,20</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Total Pago</Heading>
                            <Text fontSize={20}>R$ 12,20</Text>
                        </Box>

                        <Box borderWidth="1px" shadow='sm' borderRadius="lg" p="10px" textAlign="center" mt={2}>
                            <Heading size="sm">Troco</Heading>
                            <Text fontSize={20}>R$ 12,20</Text>
                        </Box>

                        <Box mt={2}>
                            <Button colorScheme="green" w="100%">Confirmar Venda</Button>
                        </Box>
                    </Box>
                </Flex>
            </ModalBody>

            <ModalFooter>
                <Button 
                    colorScheme='blue' 
                    mr={3} 
                    // onClick={ props.saveButtonOnClick }
                >
                    Salvar
                </Button>
                <Button 
                    // onClick={ props.onClose }
                >
                    Cancelar
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}