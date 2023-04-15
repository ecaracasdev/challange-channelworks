import request from 'supertest';
import { app, closeServer } from '../../src/app';
import jwt from 'jsonwebtoken';
const jwtToken = jwt.sign({ username: 'admin' }, 'secretKey');

let developerId = '';

describe('test cases for licenses', () => {
  afterAll(async () => {
    await closeServer();
  });
  it('should create a new license', async () => {
    const newLicense = {
      id: '5',
      software: 'HP',
    };
    const res = await request(app)
      .post('/licenses')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newLicense);
    expect(res.statusCode).toEqual(201);
    expect(res.body.license).toHaveProperty('id', '5');
    expect(res.body.license).toHaveProperty('software', 'HP');
  });

  it('should return 401 error when not authenticated', async () => {
    const res = await request(app).post('/licenses').send({
      id: '5',
      software: 'HP',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });

  it('should delete an license', async () => {
    const res = await request(app)
      .delete('/licenses/1')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'license deleted successfully');
  });

  it('should return 404 error when license not found', async () => {
    const res = await request(app)
      .delete('/licenses/100')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'license not found');
  });

  it('should return 401 error when not authenticated', async () => {
    const res = await request(app).delete('/licenses/2');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });

  it('should list all the licenses', async () => {
    const res = await request(app)
      .get('/licenses')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('licenses');
    expect(res.body.licenses).toHaveLength(2);
  });

  it('should return 401 error when not authenticated', async () => {
    const res = await request(app).get('/licenses');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });
});
