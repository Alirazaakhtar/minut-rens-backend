const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  it('POST /auth/login skal returnere token for korrekt bruger', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.dk',
        password: '12345'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /auth/login skal give 401 ved forkert adgangskode', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'forkertkode'
      });
    expect(res.statusCode).toBe(401);
  });
});
