import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);

let customerAuthToken: string;
let adminAuthToken: string;

describe('Testing users route', () => {
    it('[post] /api/users/ should create new customer and return 200', async () => {
        await request
            .post('/api/users')
            .type('form')
            .send({
                userId: 'testCustomer',
                firstName: 'Test',
                lastName: 'Customer',
                password: 'q1w2e3r4',
            })
            .expect(200)
            .expect((response) => {
                customerAuthToken = response.text;
            });
    });

    it('[post] /api/users/ should return 400 if body parameters are not passed', async () => {
        await request.post('/api/users').type('form').expect(400);
    });

    it('[post] /api/users/ should create admin user and retun 200', async () => {
        await request
            .post('/api/users')
            .type('form')
            .send({
                userId: 'testAdmin',
                firstName: 'Test',
                lastName: 'Admin',
                password: 'q1w2e3r4',
                role: 'admin',
            })
            .expect(200)
            .expect((response) => {
                adminAuthToken = response.text;
            });
    });

    it('[get] /api/users/ should return available users informations for admin', async () => {
        const response = await request
            .get('/api/users')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);
        expect(response.body.length).toEqual(5);
    });

    it('[get] /api/users/ should return 403 if customer tries to query the index method', async () => {
        await request
            .get('/api/users')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${customerAuthToken}`)
            .expect(403);
    });

    it('[get] /api/users/testUser should return requested users information for admin', async () => {
        const response = await request
            .get('/api/users/testUser')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${adminAuthToken}`)
            .expect(200);
        expect(response.body.id).toEqual('testUser');
    });

    it('[post] /api/users/login should return authtoken for successful login', async () => {
        await request
            .post('/api/users/login')
            .type('form')
            .send({
                userId: 'testAdmin',
                password: 'q1w2e3r4',
            })
            .expect(200);
    });

    it('[post] /api/users/login should return 400 for failure login', async () => {
        await request
            .post('/api/users/login')
            .type('form')
            .send({
                userId: 'testAdmin',
                password: 'q1w2e3',
            })
            .expect(400);
    });
});
