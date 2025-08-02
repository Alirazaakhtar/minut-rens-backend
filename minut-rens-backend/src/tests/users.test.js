const request = require('supertest');
const app = require('../app');

const adminCredentials = {
  email: 'admin@test.dk',
  password: '12345'
};

describe('Users API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(adminCredentials);
    token = res.body.token;
  });

  it('GET /users skal returnere alle brugere', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});