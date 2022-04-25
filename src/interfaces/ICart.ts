import { Document } from 'mongoose';
import ICartItemModel from './ICartItem';

export interface ICart {
    items: ICartItemModel[];
    totalValue: number;
}

export default interface ICartModel extends ICart, Document {}