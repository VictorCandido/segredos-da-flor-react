import type { NextApiRequest } from 'next'
import ResponseMessage from '../classes/ResponseMessage';
import ICustomerModel from '../interfaces/ICustomer';
import CustomerModel from '../models/CustomerModel';

const _create = async (req: NextApiRequest): Promise<ResponseMessage<ICustomerModel>> => {
    try {
        const { body } = req;

        const newCustomer = await CustomerModel.create(body);
        return new ResponseMessage(true, 201, 'Cliente criado com sucesso', newCustomer);
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _list = async (req: NextApiRequest): Promise<ResponseMessage<ICustomerModel>> => {
    try {
        const { id } = req.query;
        const newCustomer = await CustomerModel.findById(id);

        if (newCustomer) {
            return new ResponseMessage(true, 200, 'Cliente listado com sucesso', newCustomer);
        } else {
            return new ResponseMessage(false, 404, 'Cliente não encontrado');
        }
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _listAll = async (req: NextApiRequest): Promise<ResponseMessage<ICustomerModel[]>> => {
    try {
        const customers = await CustomerModel.find();
        return new ResponseMessage(true, 200, 'Clientes listados com sucesso', customers);
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _update = async (req: NextApiRequest): Promise<ResponseMessage<ICustomerModel>> => {
    try {
        const { body } = req;
        const { id } = req.query;
    
        const customer = await CustomerModel.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });

        if (customer) {
            return new ResponseMessage(true, 200, 'Cliente atualizado com sucesso', customer);
        } else {
            return new ResponseMessage(false, 404, 'Cliente não encontrado');
        }
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _delete = async (req: NextApiRequest): Promise<ResponseMessage<ICustomerModel>> => {
    try {
        const { id } = req.query;
        const newCustomer = await CustomerModel.findByIdAndDelete(id);

        if (newCustomer) {
            return new ResponseMessage(true, 200, 'Cliente removido com sucesso');
        } else {
            return new ResponseMessage(false, 404, 'Cliente não encontrado');
        }
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const CustomerController = {
    create: _create,
    listAll: _listAll,
    list: _list,
    update: _update,
    delete: _delete
};

export default CustomerController;