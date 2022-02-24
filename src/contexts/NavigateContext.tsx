import { createContext, useState } from "react";
import selectedPageInterface from "../interfaces/selectedPageInterface";
import ContextProviderInterface from "../interfaces/ContextProviderInterface";
import NavigateContextInterface from "../interfaces/NavigateContextInterface";

export const NavigateContext = createContext({} as NavigateContextInterface);

export function NavigateProvider({ children }: ContextProviderInterface) {
    const [ selectedPage, setSelectedPage ] = useState<selectedPageInterface>({ key: '', title: '' });
    const [ openSidebar, setOpenSidebar ] = useState(true);

    const value: NavigateContextInterface = {
        selectedPage,
        setSelectedPage,
        openSidebar,
        setOpenSidebar
    }

    return (
        <NavigateContext.Provider value={ value }>
            { children }
        </NavigateContext.Provider>
    )
}