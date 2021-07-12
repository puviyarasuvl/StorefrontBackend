import express from 'express';
import dashboardRouter from './api/customerDashboard';
import orderRouter from './api/orders';
import productRouter from './api/products';
import userRouter from './api/users';

const routes = express.Router();

routes.get('/', (_req, res) => {
    res.send(
        'Server is up. API is ready for use. Please access the correct endpoints.'
    );
});

routes.use('/users', userRouter);

routes.use('/products', productRouter);

routes.use('/orders', orderRouter);

routes.use('/dashboard', dashboardRouter);

export default routes;
