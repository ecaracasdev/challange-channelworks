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

  it('should add a new developer', async () => {
    const developer = {
      id: '1',
      fullname: 'John Doe',
      active: true,
      assets: [],
      licenses: [],
    };
    const res = await request(app)
      .post('/developers')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(developer);

    // Make assertions on the response
    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual('Developer added successfully');
    expect(res.body.developer).toEqual(developer);

    // Save the developer ID for the next test
    developerId = developer.id;
  });

  it('should set a developer as inactive and remove their assets and licenses', async () => {
    const res = await request(app)
      .patch(`/developers/${developerId}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    // Make assertions on the response
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual(
      'Developer set as inactive and their assets and licenses removed'
    );
    expect(res.body.developer.active).toEqual(false);
    expect(res.body.developer.assets).toEqual([]);
    expect(res.body.developer.licenses).toEqual([]);
  });

  it('should return a 404 if developer not found', async () => {
    const res = await request(app)
      .patch('/developers/invalid-id')
      .set('Authorization', `Bearer ${jwtToken}`);

    // Make assertions on the response
    expect(res.status).toEqual(404);
    expect(res.body.error).toEqual('Developer not found');
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
