import type { NextApiRequest } from 'next'
import ResponseMessage from '../classes/ResponseMessage';
import IProductModel from '../interfaces/IProduct';
import ProductModel from '../models/ProductModel';

const _create = async (req: NextApiRequest): Promise<ResponseMessage<IProductModel>> => {
    try {
        const { body } = req;
    
        const newProduct = await ProductModel.create(body);
        return new ResponseMessage(true, 201, 'Produto criado com sucesso', newProduct);
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _list = async (req: NextApiRequest): Promise<ResponseMessage<IProductModel>> => {
    try {
        const { id } = req.query;
        const newProduct = await ProductModel.findById(id);

        if (newProduct) {
            return new ResponseMessage(true, 200, 'Produto listado com sucesso', newProduct);
        } else {
            return new ResponseMessage(false, 404, 'Produto não encontrado');
        }
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _listAll = async (req: NextApiRequest): Promise<ResponseMessage<IProductModel[]>> => {
    try {
        const Products = await ProductModel.find();
        return new ResponseMessage(true, 200, 'Produtos listados com sucesso', Products);
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _update = async (req: NextApiRequest): Promise<ResponseMessage<IProductModel>> => {
    try {
        const { body } = req;
        const { id } = req.query;
    
        const Product = await ProductModel.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });

        if (Product) {
            return new ResponseMessage(true, 200, 'Produto atualizado com sucesso', Product);
        } else {
            return new ResponseMessage(false, 404, 'Produto não encontrado');
        }
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const _delete = async (req: NextApiRequest): Promise<ResponseMessage<IProductModel>> => {
    try {
        const { id } = req.query;
        const newProduct = await ProductModel.findByIdAndDelete(id);

        if (newProduct) {
            return new ResponseMessage(true, 200, 'Produto removido com sucesso');
        } else {
            return new ResponseMessage(false, 404, 'Produto não encontrado');
        }
    } catch (error: any) {
        return new ResponseMessage(false, 500, error.message, error);
    }
}

const ProductController = {
    create: _create,
    listAll: _listAll,
    list: _list,
    update: _update,
    delete: _delete
};

export default ProductController;