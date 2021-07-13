import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

let customerAuthToken: string;

describe('Testing dashboard route', () => {
    it('[get] /api/dashboard/cart should return the current order details', async () => {
        await request
            .post('/api/users/login')
            .type('form')
            .send({
                userId: 'testUser2',
                password: 'testpassword123',
            })
            .expect(200)
            .expect((response) => {
                customerAuthToken = response.text;
            });

        // Create new order and add some products
        await request
            .post('/api/orders/')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        await request
            .post('/api/orders/addProduct')
            .type('form')
            .send({ orderId: 6, productId: 3, quantity: 5 })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        await request
            .post('/api/orders/addProduct')
            .type('form')
            .send({ orderId: 6, productId: 2, quantity: 3 })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        const response = await request
            .get('/api/dashboard/cart')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.orderStatus).toEqual('Open');
        expect(response.body.products.length).toEqual(2);
    });

    it('[get] /api/dashboard/cart should return 401 for unauthenticated requests', async () => {
        await request.get('/api/dashboard/cart').expect(401);
    });

    it('[get] /api/dashboard/orders should return completed orders', async () => {
        const response = await request
            .get('/api/dashboard/orders')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.userId).toEqual('testUser2');
        expect(response.body.orders.length).toEqual(2);
    });
});
