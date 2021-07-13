import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

let customerAuthToken: string;
let adminAuthToken: string;

describe('Testing orders route', () => {
    it('[post] /api/orders should customer to create a new order', async () => {
        await request
            .post('/api/users/login')
            .type('form')
            .send({
                userId: 'testCustomer',
                password: 'q1w2e3r4',
            })
            .expect(200)
            .expect((response) => {
                customerAuthToken = response.text;
            });

        const response = await request
            .post('/api/orders/')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.userid).toEqual('testCustomer');
        expect(response.body.status).toEqual('Open');
    });

    it('[get] /api/orders should return all the orders information to admin', async () => {
        await request
            .post('/api/users/login')
            .type('form')
            .send({
                userId: 'testAdmin',
                password: 'q1w2e3r4',
            })
            .expect(200)
            .expect((response) => {
                adminAuthToken = response.text;
            });

        const response = await request
            .get('/api/orders')
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);

        expect(response.body.length).toEqual(5);
    });

    it('[get] /api/orders/5 should return specified order details to the user', async () => {
        const response = await request
            .get('/api/orders/5')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.userid).toEqual('testCustomer');
        expect(response.body.status).toEqual('Open');
    });

    it('[post] /api/orders/addProduct should allow user to add products to the open order(Cart)', async () => {
        const response = await request
            .post('/api/orders/addProduct')
            .type('form')
            .send({ orderId: 5, productId: 3, quantity: 5 })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body).toEqual({
            id: 6,
            orderid: 5,
            productid: 3,
            quantity: 5,
        });
    });

    it('[patch] /api/orders should allow user to update the status', async () => {
        const response = await request
            .patch('/api/orders')
            .type('form')
            .send({ orderId: 5, status: 'Placed' })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(200);

        expect(response.body.status).toEqual('Placed');
    });
});
