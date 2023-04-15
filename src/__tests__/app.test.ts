import request from 'supertest';
import { app, closeServer } from '../app';
import jwt from 'jsonwebtoken';

const adminUser = {
  username: 'admin',
  password: 'password',
};

const jwtToken = jwt.sign({ username: 'admin' }, 'secretKey');

let developerId = '';

describe('GET /', () => {
  afterAll(async () => {
    await closeServer();
  });

  it('should return a valid JWT token on successful login', async () => {
    const res = await request(app).post('/login').send({
      username: adminUser.username,
      password: adminUser.password,
    });
    // Make assertions on the response
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Login successful');
    expect(typeof res.body.token).toEqual('string');
  });
});
