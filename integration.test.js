const request = require('supertest');
const app = require('index'); // Adjust the path based on your project structure

process.env.DB_DIALECT = 'postgres';
process.env.DB_HOST = 'localhost';
process.env.DB_USERNAME = 'aakashrajawat';
process.env.DB_PASSWORD = 'aakashrajawat';
process.env.DB_NAME = 'cloud';
process.env.DB_PORT = '8080';


describe('Integration Tests', () => {
  it('should return a success response from /healthz', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
