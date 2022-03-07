export default interface UtilsContextInterface {
    handleWithCurrencyValue: (value: string) => number;
    handleWithShowCurrencyValue: (value: number) => string;
}