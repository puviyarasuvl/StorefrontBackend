import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

let customerAuthToken: string;
let adminAuthToken: string;

describe('Testing products route', () => {
    it('[post] /api/products should allow admin to add new products', async () => {
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
            .post('/api/products')
            .type('form')
            .send({
                productName: 'Zebronics',
                price: '2500.0',
                category: 'Speakers',
            })
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);

        expect(response.body.name).toEqual('Zebronics');
    });

    it('[post] /api/products should not allow customer to add new products', async () => {
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

        await request
            .post('/api/products')
            .type('form')
            .send({
                productName: 'Zebronics',
                price: '2500.0',
                category: 'Speakers',
            })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(403);
    });

    it('[get] /api/products should return all available products information', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            { id: 2, name: 'HP Elitebook', price: 75000, category: 'PC' },
            {
                id: 3,
                name: 'Apple iPhone 10',
                price: 60000,
                category: 'Mobiles',
            },
            { id: 4, name: 'Zebronics', price: 2500, category: 'Speakers' },
        ]);
    });

    it('[get] /api/products/4 should return product information for given id', async () => {
        const response = await request.get('/api/products/4');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 4,
            name: 'Zebronics',
            price: 2500,
            category: 'Speakers',
        });
    });

    it('[delete] /api/products/ should allow admin to delete a product', async () => {
        const response = await request
            .delete('/api/products')
            .type('form')
            .send({
                productId: 4,
            })
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);
        expect(response.text).toEqual('Product deleted successfully');
    });

    it('[delete] /api/products/ should not allow customer to delete a product', async () => {
        await request
            .delete('/api/products')
            .type('form')
            .send({
                productId: 4,
            })
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(403);
    });

    it('[get] /api/products/category/Mobiles should return the products in the give category', async () => {
        const response = await request.get('/api/products/category/Mobiles');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 3,
                name: 'Apple iPhone 10',
                price: 60000,
                category: 'Mobiles',
            },
        ]);
    });
});
