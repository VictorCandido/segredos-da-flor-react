import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { NavigateProvider } from '../contexts/NavigateContext';
import { CustomerProvider } from '../contexts/CustomerContext';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavigateProvider>
      <CustomerProvider>
        <ChakraProvider theme={ theme }>
          <Component {...pageProps} />
        </ChakraProvider>
      </CustomerProvider>
    </NavigateProvider>
  )
}

export default MyApp
