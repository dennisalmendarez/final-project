const request = require('supertest');
const app = 'https://final-project-cb6l.onrender.com';

describe('Deliveries API', () => {
    test('GET /deliveries should return all deliveries', async () => {
        const response = await request(app).get('/deliveries');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /deliveries/:id should return a single delivery or 404', async () => {
        const testId = '67aff0c0ed43d1234939738f';
        const response = await request(app).get(`/deliveries/${testId}`);
        expect([200, 404]).toContain(response.status);
    });
});