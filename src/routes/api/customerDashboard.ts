import express from 'express';
import authenticator from '../../services/authenticator';
import { CustomerDashboard } from '../../services/customerDashboard';
import userIdGetter from '../../services/userIdGetter';

const dashboardRouter = express.Router();

const customerDashboard = new CustomerDashboard();

const currentOrder = async (_req: express.Request, res: express.Response) => {
    try {
        const result = await customerDashboard.currentOrder(res.locals.userId);
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

const completedOrders = async (
    _req: express.Request,
    res: express.Response
) => {
    try {
        const result = await customerDashboard.completedOrders(
            res.locals.userId
        );
        res.send(result);
    } catch (err) {
        res.status(400);
        res.send(`Error : ${err}`);
    }
};

dashboardRouter.get('/cart', authenticator, userIdGetter, (req, res) => {
    currentOrder(req, res);
});

dashboardRouter.get('/orders', authenticator, userIdGetter, (req, res) => {
    completedOrders(req, res);
});

export default dashboardRouter;
