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
      .get('/services');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /services/id skal returnere service med korrekt id', async () => {
    const serviceId = 1;
    const res = await request(app)
      .get('/services/' + serviceId)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', serviceId);
  });

  var service_id = 0;

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

      service_id = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('PUT /services/id skal opdatere en service', async () => {
    const opdateretService = {
      name: 'Rens skjorte premium',
      price: 59.95,
      description: 'Skjorterens med ekstra kvalitet'
    };

    const res = await request(app)
      .put('/services/' + service_id)
      .set('Authorization', `Bearer ${token}`)
      .send(opdateretService);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', service_id);
    expect(res.body).toHaveProperty('name', 'Rens skjorte premium');
    expect(res.body).toHaveProperty('price', 59.95);
  });

  it('DELETE /services/id skal slette en service', async () => {
    const res = await request(app)
    .delete('/services/' + service_id)
    .set('Authorization', `Bearer ${token}`);

     expect(res.statusCode).toBe(200);
  });
});