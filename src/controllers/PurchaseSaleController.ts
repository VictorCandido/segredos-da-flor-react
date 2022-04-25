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
    const cartItemsIdArray = new Array();
    let newCart: HydratedDocument<ICartModel> | null = null;
    let newSale: HydratedDocument<ISaleModel> | null = null;
    let newPurchaseSale: HydratedDocument<IPurchaseSaleModel> | null = null;

    try {
        const { currentDate, data: sale, type }: IPurchaseSale = req.body;
        const { items, totalValue } = sale.cart;


        for (var i = 0; i < items.length; i++) {
            const item = items[i];

            const newCartItem: HydratedDocument<ICartItemModel> = await CartItemModel.create({
                cartItemId: item.cartItemId,
                product: item.product._id,
                quantid: item.quantid,
                totalValue: item.totalValue
            });

            cartItemsIdArray.push(newCartItem._id);
        }

        newCart = await CartModel.create({
            items: cartItemsIdArray,
            totalValue
        });

        newSale = await SaleModel.create({
            cart: newCart?._id,
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

        newPurchaseSale = await PurchaseSaleModel.create({ 
            type,
            currentDate,
            data: newSale?._id,
        });

        return new ResponseMessage(true, 201, 'Produto criado com sucesso', newPurchaseSale);
    } catch (error: any) {
        console.log('Falha ao registar venda. Removendo registros cadastrados...');

        for (var i = 0; i < cartItemsIdArray.length; i++) {
            await CartItemModel.findByIdAndDelete(cartItemsIdArray[i]);
        }

        if (newCart?._id) {
            await CartModel.findByIdAndDelete(newCart?._id);
        }

        if (newSale?._id) {
            await SaleModel.findByIdAndDelete(newSale?._id);
        }

        if (newPurchaseSale?._id) {
            await PurchaseSaleModel.findByIdAndDelete(newPurchaseSale?._id);
        }

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