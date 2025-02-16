const request = require('supertest');
const app = 'https://final-project-cb6l.onrender.com';

describe('Products API', () => {
    test('GET /products should return all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /products/:id should return a single product or 404', async () => {
        const testId = '67afefbded43d1234939736c';
        const response = await request(app).get(`/products/${testId}`);
        expect([200, 404]).toContain(response.status);
    });
});