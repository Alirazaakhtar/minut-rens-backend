const request = require('supertest');
const app = require('../app');

const adminCredentials = {
  email: 'admin@test.dk',
  password: '12345'
};

describe('Auth API', () => {

    let token;

    beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(adminCredentials);

    token = res.body.token;
     });


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

  it('POST /auth/register skal give 400, hvis bruger allerede findes', async () => {
    const res = await request(app)
    .post('/auth/register')
    .send({
        name: 'Ali test',
        email: 'test@test.com',
        password: '12345'
    });

    expect(res.statusCode).toBe(400);
  });

  var user_id = 0;

  it('POST /auth/register skal register en ny bruger', async () => {
    const res = await request(app)
    .post('/auth/register')
    .send({
        name: 'Test5',
        email: 'test@5.com',
        password: '12345'
    });

    user_id = res.body.user.id;
    expect(res.statusCode).toBe(201);
  });

   it('DELETE /users/id skal slette en bruger', async () => {
    const res = await request(app)
    .delete('/users/' + user_id)
    .set('Authorization', `Bearer ${token}`);

     expect(res.statusCode).toBe(200);
  });
});