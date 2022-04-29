import CartItem from "./CartItem";

export default class Cart {
  #Items: CartItem[];
  #TotalValue: number;

  constructor(items: CartItem[], totalValue: number) {
    this.#Items = items;
    this.#TotalValue = totalValue;
  }

  get items(): CartItem[] {
    return this.#Items;
  }
  set items(items: CartItem[]) {
    this.#Items = items;
  }

  get totalValue(): number {
    return this.#TotalValue;
  }
  set totalValue(totalValue: number) {
    this.#TotalValue = totalValue;
  }

  build() {
    return {
      items: this.items.map(item => item.build()),
      totalValue: this.totalValue
    };
  }
}