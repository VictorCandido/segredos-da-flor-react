import type { NextApiRequest, NextApiResponse } from 'next'
import ResponseMessage from '../../../classes/ResponseMessage';
import PurchaseSaleController from '../../../controllers/PurchaseSaleController';
import DbConnection from '../../../services/DbConnection'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    let responseMessage: ResponseMessage = new ResponseMessage(false, 405, 'Method Not Allowed');

    try {
        const { method } = req;
        await DbConnection();

        const buildResponse: any = {
            'GET': async () => responseMessage = await PurchaseSaleController.listAll(req),
            'POST': async () => responseMessage = await PurchaseSaleController.create(req),
            'DEFAULT': () => responseMessage = new ResponseMessage(false, 405, 'Method Not Allowed')
        };
        await (buildResponse[method as string] || buildResponse['DEFAULT'])();
    } catch (error: any) {
        responseMessage = new ResponseMessage(false, 500, error.message, error);
    }

    res.status(responseMessage.code).json(responseMessage.build());
}