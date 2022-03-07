import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { NavigateProvider } from '../contexts/NavigateContext';
import { CustomerProvider } from '../contexts/CustomerContext';
import { ProductProvider } from '../contexts/ProductContext';
import { SellProvider } from '../contexts/SellContext';
import { UtilsProvider } from '../contexts/UtilsContext';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UtilsProvider>
      <NavigateProvider>
        <CustomerProvider>
          <SellProvider>
            <ProductProvider>
              <ChakraProvider theme={ theme }>
                <Component {...pageProps} />
              </ChakraProvider>
            </ProductProvider>
          </SellProvider>
        </CustomerProvider>
      </NavigateProvider>
    </UtilsProvider>
  )
}

export default MyApp
