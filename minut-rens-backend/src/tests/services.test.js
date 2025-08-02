const request = require('supertest');
const app = require('../app');

const adminCredentials = {
  email: 'admin@test.dk',
  password: '12345'
};

describe('Services API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(adminCredentials);
    token = res.body.token;
  });

  it('GET /services skal returnere alle services', async () => {
    const res = await request(app)
      .get('/services')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /services skal oprette en ny service', async () => {
    const newService = {
      name: 'Test Service',
      price: 99.99,
      description: 'Test beskrivelse'
    };

    const res = await request(app)
      .post('/services')
      .send(newService)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});