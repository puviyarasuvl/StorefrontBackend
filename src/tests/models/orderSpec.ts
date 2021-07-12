import { Order, OrderModel } from '../../models/order';

const orderModel = new OrderModel();
let date = new Date().toLocaleString();

const order: Order = {
    id: 1,
    userid: 'testUser2',
    status: 'Open',
    createddate: date,
};

describe('Testing Order Model', () => {
    describe('create method', () => {
        it('should create a new order for the given user', async () => {
            order.createddate = new Date().toLocaleString();
            let result = await orderModel.create('testUser2');
            expect(result).toEqual(order);

            result = await orderModel.create('testUser3');
        });

        it('should throw error if trying to create another open order(cart) for same user', async () => {
            let error;

            expect(error).toBeUndefined();

            try {
                const result = await orderModel.create('testUser2');
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(
                new Error('Cannot create two open orders(cart) for single user')
            );
        });
    });

    describe('index method', () => {
        it('should return all the orders', async () => {
            order.createddate = new Date().toLocaleString();
            const result = await orderModel.index();

            expect(result.length).toEqual(2);
            expect(result[0]).toEqual(order);
        });
    });

    describe('show method', () => {
        it('should return order details based on given order id', async () => {
            order.createddate = new Date().toLocaleString();
            const result = await orderModel.show(1);

            expect(result).toEqual(order);
        });
    });

    describe('update method', () => {
        it('should update the order status to provided status', async () => {
            const result = await orderModel.update(1, 'Placed');

            expect(result.status).toEqual('Placed');
        });
    });
});

describe('Testing Order Products', () => {
    describe('addProduct method', () => {
        it('should throw error while adding products, if order is not open', async () => {
            let error;

            expect(error).toBeUndefined();

            try {
                const result = await orderModel.addProduct(1, 1, 20);
            } catch (err) {
                error = err;
            }

            expect(error).toEqual(
                new Error('Order not found or order is not open')
            );
        });

        it('should add the product successfully', async () => {
            const result = await orderModel.addProduct(2, 3, 2);
            expect(result).toEqual({
                id: 1,
                orderid: 2,
                productid: 3,
                quantity: 2,
            });
        });
    });
});
