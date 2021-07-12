import express from 'express';
import { Product, ProductModel } from '../../models/product';
import authenticator from '../../services/authenticator';
import roleValidator from '../../services/roleValidator';

const productRouter = express.Router();

const productModel = new ProductModel();

const create = async (req: express.Request, res: express.Response) => {
    const newProduct: Product = {
        name: req.body.productName,
        price: req.body.price,
        category: req.body.category,
    };

    try {
        const result = await productModel.create(newProduct);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const result = await productModel.index();
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const result = await productModel.show(parseInt(req.params.productId));
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const result = await productModel.delete(parseInt(req.body.productId));

        if (result) {
            res.send('Product deleted successfully');
        }
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const productsByCategory = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const result = await productModel.productsByCategory(
            req.params.category
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

productRouter.post('/', roleValidator, authenticator, (req, res) => {
    create(req, res);
});

productRouter.get('/', (req, res) => {
    index(req, res);
});

productRouter.get('/:productId', (req, res) => {
    show(req, res);
});

productRouter.delete('/', roleValidator, authenticator, (req, res) => {
    deleteProduct(req, res);
});

productRouter.get('/category/:category', (req, res) => {
    productsByCategory(req, res);
});

export default productRouter;
