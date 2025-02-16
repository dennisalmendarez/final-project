const request = require('supertest');
const app = 'https://final-project-cb6l.onrender.com';

describe('Stores API', () => {
    test('GET /stores should return all stores', async () => {
        const response = await request(app).get('/stores');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /stores/:id should return a single store or 404', async () => {
        const testId = '67aff017ed43d12349397380';
        const response = await request(app).get(`/stores/${testId}`);
        expect([200, 404]).toContain(response.status);
    });
});