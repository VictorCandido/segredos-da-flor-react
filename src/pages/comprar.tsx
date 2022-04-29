import { Box, FormControl, FormLabel, Heading, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Select from 'react-select'
import CurrencyInput from 'react-currency-input';
import { useContext, useEffect, useState } from 'react';
import MenuSidebar from '../components/MenuSidebar'
import { NavigateContext } from '../contexts/NavigateContext';
import ProductAsOption from '../classes/ProductAsOption';
import Product from '../classes/Product';

const Comprar: NextPage = () => {
  const { setSelectedPage } = useContext(NavigateContext);
  const [ selectedProduct, setSelectedProduct ] = useState<ProductAsOption>(new ProductAsOption(new Product(), '', ''));
  const [ productOptions, setProductOptions ] = useState<ProductAsOption[]>([]);

  useEffect(() => {
    setSelectedPage({ key: 'comprar', title: 'Comprar' });
  }, [setSelectedPage]);

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
                // onChange={ productOption => handleWithFormUpdate('product', productOption as ProductAsOption) }
              />
          </FormControl>

          {/* QUANTID FIELD */}
          <FormControl>
              <FormLabel>Quantidade</FormLabel>
              <NumberInput 
                min={0} 
                // onChange={ (vs: string, valueAsNumber: number) => handleWithFormUpdate('quantid', valueAsNumber) }
                // value={ cartItem.quantid }
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
          {/* SALE UNIT VALUE FIELD */}
          <FormControl>
              <FormLabel>Valor Unitário</FormLabel>
              <Input
                as={ CurrencyInput } 
                decimalSeparator="," 
                thousandSeparator="."
                prefix="R$"
                readOnly 
                placeholder='Valor Unitário' 
                // value={ cartItem.product.saleValue } 
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
                // value={ ((cartItem.product.saleValue || 0) * (cartItem.quantid || 0)) }
              />
          </FormControl>
        </HStack>
      </Box>
    </MenuSidebar>
  )
}

export default Comprar
