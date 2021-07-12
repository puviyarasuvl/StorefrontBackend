import express from 'express';

import { OrderModel } from '../../models/order';
import authenticator from '../../services/authenticator';
import roleValidator from '../../services/roleValidator';
import userIdGetter from '../../services/userIdGetter';

const orderRouter = express.Router();

const orderModel = new OrderModel();

const create = async (_req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.create(res.locals.userId);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const index = async (_req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.index();
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const show = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.show(parseInt(req.params.orderId));
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const updateStaus = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.update(
            parseInt(req.body.orderId),
            req.body.status
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const addProduct = async (req: express.Request, res: express.Response) => {
    try {
        const result = await orderModel.addProduct(
            parseInt(req.body.orderId),
            parseInt(req.body.productId),
            parseInt(req.body.quantity)
        );

        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

orderRouter.post('/', authenticator, userIdGetter, (req, res) => {
    create(req, res);
});

orderRouter.get('/', roleValidator, authenticator, (req, res) => {
    index(req, res);
});

orderRouter.get('/:orderId', authenticator, (req, res) => {
    show(req, res);
});

orderRouter.patch('/', authenticator, (req, res) => {
    updateStaus(req, res);
});

orderRouter.post('/addProduct', authenticator, (req, res) => {
    addProduct(req, res);
});

export default orderRouter;
