import request from 'supertest';
import { app, closeServer } from '../app'; // assuming that app listens on 'http://localhost:3000'

describe('POST /api/auth/login', () => {
  afterAll(async () => {
    await closeServer();
  });
  it('responds with a JWT token on successful login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password' }) // sending request body
      .set('Content-Type', 'application/json') // setting headers
      .expect('Content-Type', /json/)
      .expect(200);

    // verify that server is returning a token
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe('string');
  });

  it('responds with an error message on invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'incorrect-password' })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    // verify that server is returning an error message
    expect(res.body.message).toEqual('Invalid credentials');
  });
});
