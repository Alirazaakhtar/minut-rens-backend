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


  const userId = 2;

  it('GET /users/id skal returnere bruger med korrekt id', async () => {
    
    const res = await request(app)
      .get('/users/' + userId)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

   it('PUT /users/id skal opdatere en bruger', async () => {
    const opdateretUser = {
      name: 'Ali test',
      email: 'test@test.com',
      role: 'user'
    };

    console.log(userId);

    const res = await request(app)
      .put('/users/' + userId)
      .set('Authorization', `Bearer ${token}`)
      .send(opdateretUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('name', opdateretUser.name);
    expect(res.body).toHaveProperty('email', opdateretUser.email);
  });
});