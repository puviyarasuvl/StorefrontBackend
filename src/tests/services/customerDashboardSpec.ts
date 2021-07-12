import {
    OrderDetails,
    CustomerDashboard,
    CompletedOrderDetails,
} from '../../services/customerDashboard';
import { OrderModel } from '../../models/order';

const orderModel = new OrderModel();
const customerDashboard = new CustomerDashboard();

const expectedOrderDetails: OrderDetails = {
    userId: 'testUser2',
    orderId: 3,
    orderStatus: 'Open',
    createdDate: '7/12/2021, 7:44:54 PM',
    products: [{ productId: 2, quantity: 1 }],
};

expectedOrderDetails.products.push({ productId: 3, quantity: 2 });

const expectedCompletedOrders: CompletedOrderDetails = {
    userId: 'testUser2',
    orders: [
        {
            orderId: 3,
            orderStatus: 'Shipped',
            createdDate: '7/12/2021, 11:15:56 PM',
            products: [
                { productId: 2, quantity: 1 },
                { productId: 3, quantity: 2 },
            ],
        },
        {
            orderId: 4,
            orderStatus: 'Shipped',
            createdDate: '7/12/2021, 11:15:56 PM',
            products: [
                { productId: 2, quantity: 10 },
                { productId: 3, quantity: 20 },
            ],
        },
    ],
};

describe('Testing Customer Dashboard', () => {
    describe('currentOrder method', () => {
        beforeAll(async () => {
            // Create some new orders
            expectedOrderDetails.createdDate = new Date().toLocaleString();
            const result = await orderModel.create('testUser2');
            orderModel.addProduct(result.id, 2, 1);
            orderModel.addProduct(result.id, 3, 2);
        });

        it('expect no of orders to be 3', async () => {
            const result = await orderModel.index();
            expect(result.length).toEqual(3);
        });

        it('should return open order details for the given user', async () => {
            const result = await customerDashboard.currentOrder('testUser2');
            expect(result).toEqual(expectedOrderDetails);
        });

        it('close the order for testUser3', async () => {
            const result = await orderModel.update(2, 'Shipped');
            expect(result.status).toEqual('Shipped');
        });

        it('close the order id 3 for testUser2', async () => {
            const result = await orderModel.update(3, 'Shipped');
            expect(result.status).toEqual('Shipped');
        });

        it('should throw error when no open order found for the user', async () => {
            let error;

            expect(error).toBeUndefined();

            try {
                const result = await customerDashboard.currentOrder(
                    'testUser3'
                );
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(
                new Error('No open order found for the user')
            );
        });
    });

    describe('completedOrders method', () => {
        beforeAll(async () => {
            // Create some new orders
            expectedCompletedOrders.orders[0].createdDate =
                new Date().toLocaleString();
            expectedCompletedOrders.orders[1].createdDate =
                new Date().toLocaleString();
            const result = await orderModel.create('testUser2');
            orderModel.addProduct(result.id, 2, 10);
            orderModel.addProduct(result.id, 3, 20);
        });

        it('expect no of orders to be 4', async () => {
            const result = await orderModel.index();
            expect(result.length).toEqual(4);
        });

        it('close the order id 4 for testUser2', async () => {
            const result = await orderModel.update(4, 'Shipped');
            expect(result.status).toEqual('Shipped');
        });

        it('should return completed orders for the given user', async () => {
            const result = await customerDashboard.completedOrders('testUser2');

            expect(result).toEqual(expectedCompletedOrders);
        });

        it('should throw error id no closed orders found for the user', async () => {
            let error;

            expect(error).toBeUndefined();

            try {
                const result = await customerDashboard.completedOrders(
                    'testUser4'
                );
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(
                new Error('No closed orders found for the user')
            );
        });
    });
});
