import type { NextApiRequest } from 'next'
import { HydratedDocument } from 'mongoose';

import ResponseMessage from '../classes/ResponseMessage';
import CartItemModel from '../models/CartItemModel';
import CartModel from '../models/CartModel';
import SaleModel from '../models/SaleModel';
import IPurchaseSaleModel, { IPurchaseSale } from './../interfaces/IPurchaseSale';
import ICartItemModel from '../interfaces/ICartItem';
import ICartModel from '../interfaces/ICart';
import ISaleModel from '../interfaces/ISale';
import PurchaseSaleModel from '../models/PurchaseSaleModel';

const _create = async (req: NextApiRequest): Promise<ResponseMessage> => {
    try {
        const { currentDate, data: sale, type }: IPurchaseSale = req.body;
        const { items, totalValue } = sale.cart;

        const cartItemsArray = new Array();

        for (var i = 0; i < items.length; i++) {
            const item = items[i];

            const newCartItem: HydratedDocument<ICartItemModel> = await CartItemModel.create({
                cartItemId: item.cartItemId,
                product: item.product._id,
                quantid: item.quantid,
                totalValue: item.totalValue
            });

            cartItemsArray.push(newCartItem._id);
        }

        const newCart: HydratedDocument<ICartModel> = await CartModel.create({
            items: cartItemsArray,
            totalValue
        });

        const newSale: HydratedDocument<ISaleModel> = await SaleModel.create({
            cart: newCart._id,
            saleDate: sale.saleDate,
            customer: sale.customer._id,
            note: sale.note,
            paymentMethod: sale.paymentMethod,
            installments: sale.installments,
            discountValue: sale.discountValue,
            discountPercentage: sale.discountPercentage,
            discounts: sale.discounts,
            netTotal: sale.netTotal,
            paidTotal: sale.paidTotal,
            change: sale.change
        });

        const newPurchaseSale: HydratedDocument<IPurchaseSaleModel> = await PurchaseSaleModel.create({ 
            type,
            currentDate,
            data: newSale._id,
        });

        return new ResponseMessage(true, 201, 'Produto criado com sucesso', newPurchaseSale);
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _listAll = async (req: NextApiRequest): Promise<ResponseMessage> => {
    try {
        const Products = await PurchaseSaleModel.find()
            .populate({
                path: 'data',
                populate: [{
                    path: 'cart',
                    populate: {
                        path: 'items',
                        populate: {
                            path: 'product',
                        }
                    }
                }, {
                    path: 'customer'
                }],
            })

        return new ResponseMessage(true, 200, 'Produtos listados com sucesso', Products);
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const PurchaseSaleController = {
    create: _create,
    listAll: _listAll,
};

export default PurchaseSaleController;