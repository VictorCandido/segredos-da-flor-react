import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import Select from 'react-select'
import CurrencyInput from 'react-currency-input';

import MenuSidebar from '../components/MenuSidebar'
import { NavigateContext } from '../contexts/NavigateContext';
import CartItem from '../classes/CartItem';
import { SellContext } from '../contexts/SellContext';
import ProductAsOption from '../classes/ProductAsOption';

const Vender: NextPage = () => {
  const [ cartItem, setCartItem ] = useState<CartItem>();
  const [ selectedProduct, setSelectedProduct ] = useState<ProductAsOption>();
  const [ productOptions, setProductOptions ] = useState<ProductAsOption[]>();

  const { setSelectedPage } = useContext(NavigateContext);
  const { getAllProducts } = useContext(SellContext);

  useEffect(() => {
    handleWithListProducts();
  }, []);

  useEffect(() => {
    setSelectedPage({ key: 'vender', title: 'Vender' });
  }, [setSelectedPage]);

  /**
   * Update the Selected cartItem state through CartItem Modal.
   * @param event Changed field`s event
   */
   function handleWithFormUpdate(fieldName: string, fieldValue: ProductAsOption | number): void {
    const totalValue = (cartItem?.product.saleValue || 0) * (cartItem?.quantid || 0);
    
    const fieldsEvents: any = {
      'product': () => {
        const productOption = fieldValue as ProductAsOption;

        setSelectedProduct(productOption);
        setCartItem(new CartItem(cartItem?.id, productOption?.product, cartItem?.quantid, totalValue));
      },
      'quantid': () => setCartItem(new CartItem(cartItem?.id, cartItem?.product, Number(fieldValue), totalValue))
    };
    fieldsEvents[fieldName]();
  }

  async function handleWithListProducts(): Promise<void> {
    const products = await getAllProducts();
    const productOptions = products.map(product => {
      return new ProductAsOption(product, product.id, product.name);
    });

    setProductOptions(productOptions);
  }
  
  return (
    <MenuSidebar>
      <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg'>
        <Heading size="lg">Detalhes do Produto</Heading>

        <HStack spacing={6} mt={4}>
          {/* PRODUCT FIELD */}
          <FormControl>
              <FormLabel>Produto</FormLabel>
              <Select
                placeholder="Digite um produto"
                isClearable 
                options={productOptions}
                value={ selectedProduct }
                onChange={ productOption => handleWithFormUpdate('product', productOption as ProductAsOption) }
              />
          </FormControl>

          {/* QUANTID FIELD */}
          <FormControl>
              <FormLabel>Quantidade</FormLabel>
              <NumberInput 
                min={0} 
                onChange={ (vs: string, valueAsNumber: number) => handleWithFormUpdate('quantid', valueAsNumber) }
                value={ cartItem?.quantid }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
          </FormControl>
        </HStack>

        <HStack spacing={6} mt={4}>
          {/* SELL UNIT VALUE FIELD */}
          <FormControl>
              <FormLabel>Valor Unitário</FormLabel>
              <Input 
                as={ CurrencyInput } 
                decimalSeparator="," 
                thousandSeparator="."
                prefix="R$"
                readOnly 
                placeholder='Valor Unitário' 
                value={ cartItem?.product.saleValue } 
              />
          </FormControl>

          {/* TOTAL VALUE FIELD */}
          <FormControl>
              <FormLabel>Valor Total</FormLabel>
              <Input 
                as={ CurrencyInput } 
                decimalSeparator="," 
                thousandSeparator="."
                prefix="R$"
                readOnly 
                placeholder='Valor Total' 
                value={ ((cartItem?.product.saleValue || 0) * (cartItem?.quantid || 0)) }
                onChange={ event => console.log(event) }
              />
          </FormControl>
        </HStack>

        {/* ADD TO CART BUTTON */}
        <HStack spacing={6} mt={4}>
          <Button 
            w="100%" 
            colorScheme='twitter' 
            size="lg"
            onClick={ () => console.log(cartItem) }
          >Adicionar ao Carrinho</Button>
        </HStack>
      </Box>

      <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg' mt="10px">
        <Heading size="lg">Carrinho</Heading>

        <Box mt="10px">
          <Table variant='striped'>
            <Thead>
              <Tr background="#f8f9fa">
                <Th w="25%">Código</Th>
                <Th w="30%">Produto</Th>
                <Th w="5%" isNumeric>Qtd.</Th>
                <Th w="15%" isNumeric>Valor Unitário</Th>
                <Th w="15%" isNumeric>Valor Total</Th>
                <Th w="5%" isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr background="#f8f9fa">
                <Th>Somatória Total</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th isNumeric>R$10,00</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Box>
    </MenuSidebar>
  )
}

export default Vender
