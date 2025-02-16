const request = require('supertest');
const app = 'https://final-project-cb6l.onrender.com';

describe('Employees API', () => {
    test('GET /employees should return all employees', async () => {
        const response = await request(app).get('/employees');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /employees/:id should return a single employee or 404', async () => {
        const testId = '67aa512ef9704d83efac19dc';
        const response = await request(app).get(`/employees/${testId}`);
        expect([200, 404]).toContain(response.status);
    });
});