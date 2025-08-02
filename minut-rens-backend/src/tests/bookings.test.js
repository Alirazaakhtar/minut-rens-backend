// tests/bookings.test.js
const request = require('supertest');
const app = require('../app');

const adminCredentials = {
  email: 'admin@test.dk',
  password: '12345'
};

describe('Bookings API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(adminCredentials);

    token = res.body.token;
  });

  it('GET /bookings/admin skal returnere alle bookinger', async () => {
    const res = await request(app)
      .get('/bookings/admin')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /bookings skal oprette en ny booking', async () => {
    const newBooking = {
      service_id: 1,
      drop_off_date: '2025-08-12',
      pick_up_date: '2025-08-14',
      status: 'modtaget',
      total_price: 149.95,
      booking_date: '2025-08-10'
    };

    const res = await request(app)
      .post('/bookings')
      .send(newBooking)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toBe('modtaget');
  });
});