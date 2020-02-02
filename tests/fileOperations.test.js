const request = require('supertest');
const app = require('../app');

test('Should upload and read excel file', async () => {
    await request(app).post('/upload').attach('file', 'tests/Files/Sample.xlsx').expect(200);
});

test('Should upload and read excel file', async () => {
    await request(app).post('/upload').expect(400);
});