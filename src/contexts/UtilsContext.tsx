import { createContext } from "react";
import CurrencyInput from 'react-currency-input';

import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import UtilsContextInterface from "../interfaces/UtilsContextInterface";

export const UtilsContext = createContext({} as UtilsContextInterface);

export function UtilsProvider({ children }: ContextProviderInterface) {
    const value = {
      handleWithCurrencyValue,
      handleWithShowCurrencyValue
    }

    /**
     * Receives a string number with mask and removes its mask
     * @param value string value with mask
     * @returns currency value in number without mask
     */
    function handleWithCurrencyValue(value: string): number {
      value = value.replaceAll('R$', '');
      value = value.replaceAll('.', '');
      value = value.replaceAll(',', '.');
      return Number(value)
    }
  
    /**
     * Transforms a number value to a string value with mask
     * @param value number value withou mask
     * @returns string value with mask
     */
    function handleWithShowCurrencyValue(value: number): string {
      let valueString = '';
      
      if (String(value).split('.').length > 1) {
        let valueStringArray = String(value).split('.');
        valueStringArray[1] = valueStringArray[1]?.padEnd(2, '0');
        
        valueString = valueStringArray.join('.');
      } else {
        valueString = String(value + '.00');
      }
  
      const props = {
        value: valueString, 
        decimalSeparator: ',',
        thousandSeparator: '.',
        prefix: 'R$'
      }
  
      return CurrencyInput.prototype.prepareProps(props).maskedValue
    }
    
    return (
        <UtilsContext.Provider value={ value }>
            { children }
        </UtilsContext.Provider>
    )
}