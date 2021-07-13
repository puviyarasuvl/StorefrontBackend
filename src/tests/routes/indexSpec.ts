import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Testing root route', () => {
    it('[get] /api should return status 200', async () => {
        const response = await request.get('/api');
        expect(response.status).toEqual(200);
    });
});
