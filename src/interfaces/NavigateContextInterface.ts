import selectedPage from "./selectedPageInterface";

export default interface NavigateContextInterface {
    selectedPage: selectedPage;
    setSelectedPage: (selectedPage: selectedPage) => void;
    openSidebar: boolean;
    setOpenSidebar: (openSidebar: boolean) => void;
}