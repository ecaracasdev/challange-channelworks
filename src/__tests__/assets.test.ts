import request from 'supertest';
import { app, closeServer } from '../../src/app';
import jwt from 'jsonwebtoken';
const jwtToken = jwt.sign({ username: 'admin' }, 'secretKey');

let developerId = '';

describe('assets test cases', () => {
  afterAll(async () => {
    await closeServer();
  });
  it('should create a new asset', async () => {
    const newAsset = {
      id: '5',
      brand: 'HP',
      model: 'ProBook',
      type: 'laptop',
    };
    const res = await request(app)
      .post('/assets')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newAsset);
    expect(res.statusCode).toEqual(201);
    expect(res.body.asset).toHaveProperty('id', '5');
    expect(res.body.asset).toHaveProperty('brand', 'HP');
    expect(res.body.asset).toHaveProperty('model', 'ProBook');
    expect(res.body.asset).toHaveProperty('type', 'laptop');
  });

  it('should return 401 error when not authenticated', async () => {
    const res = await request(app).post('/assets').send({
      id: '5',
      brand: 'HP',
      model: 'ProBook',
      type: 'laptop',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });

  it('should delete an asset', async () => {
    const res = await request(app)
      .delete('/assets/1')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Asset deleted successfully');
  });

  it('should return 404 error when asset not found', async () => {
    const res = await request(app)
      .delete('/assets/100')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Asset not found');
  });

  it('should return 401 error when not authenticated', async () => {
    const res = await request(app).delete('/assets/2');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });

  it('should list all the assets', async () => {
    const res = await request(app)
      .get('/assets')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('assets');
    expect(res.body.assets).toHaveLength(4);
  });

  it('should return 401 error when not authenticated', async () => {
    const res = await request(app).get('/assets');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Unauthorized');
  });
});
