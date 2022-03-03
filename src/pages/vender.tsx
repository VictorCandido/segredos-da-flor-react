import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, HStack, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import Select from 'react-select'
import CurrencyInput from 'react-currency-input';
import { FiTrash2 } from 'react-icons/fi';

import MenuSidebar from '../components/MenuSidebar'

import { NavigateContext } from '../contexts/NavigateContext';
import { SellContext } from '../contexts/SellContext';

import CartItem from '../classes/CartItem';
import Cart from '../classes/Cart';
import ProductAsOption from '../classes/ProductAsOption';
import Product from '../classes/Product';
import { UtilsContext } from '../contexts/UtilsContext';
import FinishSaleModal from '../components/FinishSaleModal';

const Vender: NextPage = () => {
  const [ cartItem, setCartItem ] = useState<CartItem>(new CartItem(new Product(), 0, 0));
  const [ cart, setCart ] = useState<Cart>(new Cart([], 0));
  const [ selectedProduct, setSelectedProduct ] = useState<ProductAsOption>(new ProductAsOption(new Product(), '', ''));
  const [ productOptions, setProductOptions ] = useState<ProductAsOption[]>([]);
  
  const { setSelectedPage } = useContext(NavigateContext);
  const { getAllProducts } = useContext(SellContext);
  const { handleWithShowCurrencyValue } = useContext(UtilsContext);

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
    const totalValue = (cartItem.product.saleValue || 0) * (cartItem.quantid || 0);
    
    const fieldsEvents: any = {
      'product': () => {
        const productOption = fieldValue as ProductAsOption;

        setSelectedProduct(productOption);
        setCartItem(new CartItem(productOption?.product || new Product(), cartItem.quantid, totalValue));
      },
      'quantid': () => setCartItem(new CartItem(cartItem.product, Number(fieldValue), totalValue))
    };
    fieldsEvents[fieldName]();
  }

  /**
   * Get all products from database and fill the product select in the form
   */
  async function handleWithListProducts(): Promise<void> {
    const products = await getAllProducts();
    const productOptions = products.map(product => {
      return new ProductAsOption(product, product.id, product.name);
    });

    setProductOptions(productOptions);
  }

  /**
   * Returns the last id of the cart items
   * @returns the id number of the last cart item
   */
  function getLastCartItemsId(): number {
    const { items } = cart;

    console.log('items before', items)
    console.log('items.length', items.length)

    if (items.length > 0) {
      return items[items.length - 1].id;
    }

    return 0;
  }

  /**
   * Calculate the total value of the cart
   * @returns total value of the cart
   */
  function calcCartTotalValue(): number {
    const { items } = cart;
    let totalValue = 0;

    items.forEach(item => totalValue += item.totalValue);

    return totalValue;
  }

  /**
   * Add the selected product to the cart items list and clear the selected product
   */
  function handleWithAddNewItemToCart(): void {
    // 1 - Calc the item id and add to the cart item that will be stored in cart items list
    const newCartItemId = getLastCartItemsId() + 1; 
    const newCartItem = new CartItem(cartItem.product, cartItem.quantid, cartItem.totalValue, newCartItemId);
    // setCartItem(newCartItem);

    // 2 - Calc the total value of the cart
    const totalValue = calcCartTotalValue() + newCartItem.totalValue;

    // 3 - Add the item to cart
    const newCart = new Cart([ ...cart.items, newCartItem ], totalValue);
    setCart(newCart);

    // 4 - Reset the cart item
    setCartItem(new CartItem(new Product(), 0, 0));
    setSelectedProduct(new ProductAsOption(new Product(), '', ''));
  }

  /**
   * Removes a item of the cart
   * @param cartItem cart item to be removed
   */
  function handleWithRemoveItemFromCart(cartItem: CartItem): void {
    const totalValueOfItemToBeRemoved = cart.items.find(item => item.id === cartItem.id)?.totalValue;
    const newCartItems = cart.items.filter(item => item.id !== cartItem.id);

    const newTotalValue = calcCartTotalValue() - (totalValueOfItemToBeRemoved || 0);

    setCart(new Cart(newCartItems, newTotalValue));
  }

  /**
   * Custom function to filter only the label from options
   * @param candidate options from select
   * @param input filter value
   * @returns if shoud show the option or not
   */
  function customProductsFilterOption(candidate: any, input: string): boolean {
    if (input) {
      return candidate.label.toLowerCase().includes(input.toLowerCase());
    }
    return true
  }

  /**
   * Clear the cart items list and the total value
   */
  function handleWithCancelSale(): void {
    setCart(new Cart([], 0));
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
                filterOption={ customProductsFilterOption  }
                onChange={ productOption => handleWithFormUpdate('product', productOption as ProductAsOption) }
              />
          </FormControl>

          {/* QUANTID FIELD */}
          <FormControl>
              <FormLabel>Quantidade</FormLabel>
              <NumberInput 
                min={0} 
                onChange={ (vs: string, valueAsNumber: number) => handleWithFormUpdate('quantid', valueAsNumber) }
                value={ cartItem.quantid }
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
                value={ cartItem.product.saleValue } 
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
                value={ ((cartItem.product.saleValue || 0) * (cartItem.quantid || 0)) }
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
            isDisabled={ !cartItem.product || !cartItem.quantid }
            onClick={ handleWithAddNewItemToCart }
          >
            Adicionar ao Carrinho
          </Button>
        </HStack>
      </Box>

      <Box p={5} shadow='md' borderWidth='1px' bg="white" borderRadius='lg' mt="10px">
        <Heading size="lg">Carrinho</Heading>

        <Box mt="10px">
          <Table variant='striped' size="sm">
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
              { cart.items.map(item => {
                return (
                  <Tr key={ item.id }>
                    <Td>{ item.product.code }</Td>
                    <Td>{ item.product.name }</Td>
                    <Td isNumeric>{ item.quantid }</Td>
                    <Td isNumeric>{ handleWithShowCurrencyValue(item.product.saleValue) }</Td>
                    <Td isNumeric>{ handleWithShowCurrencyValue(item.totalValue) }</Td>
                    <Td isNumeric d="flex" justifyContent="space-around">
                      <IconButton
                        aria-label='Editar'
                        icon={ <FiTrash2 /> }
                        colorScheme="red"
                        variant="ghost"
                        isRound
                        onClick={ () => handleWithRemoveItemFromCart(item) }
                      />
                    </Td>
                  </Tr>
                )
              }) }

              
            </Tbody>
            <Tfoot>
              <Tr background="#f8f9fa">
                <Th>Somatória Total</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th isNumeric fontSize={15}>{ handleWithShowCurrencyValue(cart.totalValue) }</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
        
        {/* ADD TO CART BUTTON */}
        <HStack spacing={6} mt={4}>
          <Button 
            w="100%" 
            colorScheme='green' 
            size="lg"
            isDisabled={ !cart.items.length }
            onClick={ handleWithAddNewItemToCart }
          >
            Finalizar Venda
          </Button>

          <Button 
            w="100%" 
            colorScheme='red' 
            size="lg"
            isDisabled={ !cart.items.length }
            onClick={ handleWithCancelSale }
          >
            Cancelar Venda
          </Button>
        </HStack>
      </Box>

      <FinishSaleModal 
        isOpen={ true }
        onClose={ () => console.log('fechou') }
      />
      
    </MenuSidebar>
  )
}

export default Vender
