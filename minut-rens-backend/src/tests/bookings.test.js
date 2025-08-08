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

  var booking_id = 0;

  it('POST /bookings skal oprette en ny booking', async () => {
    const newBooking = {
      service_id: 1,
      drop_off_date: '2025-08-12',
      pick_up_date: '2025-08-14',
      status: 'modtaget',
      total_price: 149.95
    };

    const res = await request(app)
      .post('/bookings')
      .send(newBooking)
      .set('Authorization', `Bearer ${token}`);

      booking_id = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toBe('modtaget');
  });

  it('DELETE /bookings/id skal slette en service', async () => {
    const res = await request(app)
    .delete('/bookings/' + booking_id)
    .set('Authorization', `Bearer ${token}`);

     expect(res.statusCode).toBe(200);
  });

  it('GET /bookings/id skal returnere booking med korrekt id', async () => {
    const bookingId = 1;

    const res = await request(app)
      .get('/bookings/' + bookingId)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', bookingId);
  });

  it('GET /bookings/id skal returnere 404 hvis booking ikke findes', async () => {
    const res = await request(app)
      .get('/bookings/9999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});