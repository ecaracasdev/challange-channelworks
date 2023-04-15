import request from 'supertest';
import { app, closeServer } from '../../src/app';
import jwt from 'jsonwebtoken';
const jwtToken = jwt.sign({ username: 'admin' }, 'secretKey');

let developerId = '';

describe('PUT /developers/:id/assets-licenses', () => {
  afterAll(async () => {
    await closeServer();
  });

  it('should add a new developer', async () => {
    const developer = {
      id: '1',
      fullname: 'John Doe',
      active: true,
      assets: [],
      licenses: [
        {
          id: '1',
          software: 'amazon',
        },
      ],
    };
    const res = await request(app)
      .post('/developers')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(developer);

    // Make assertions on the response
    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual('Developer added successfully');
    expect(res.body.developer).toEqual(developer);
  });

  it('should add a new asset to a developer', async () => {
    const response = await request(app)
      .put('/developers/1/assets-licenses')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        type: 'asset',
        operation: 'add',
        value: {
          id: '2',
          brand: 'Apple',
          model: 'MacBook Pro',
          type: 'laptop',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Developer assets updated successfully');
    expect(response.body.developer.assets).toHaveLength(1);
  });

  it('should remove an existing license from a developer', async () => {
    const response = await request(app)
      .put('/developers/1/assets-licenses')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        type: 'license',
        operation: 'remove',
        value: '1',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Developer licenses updated successfully'
    );
    expect(response.body.developer.licenses).toHaveLength(0);
  });

  it('should replace all assets of a developer', async () => {
    const newAssets = [
      {
        id: '4',
        brand: 'HP',
        model: 'EliteBook 840 G7',
        type: 'laptop',
      },
    ];

    const response = await request(app)
      .put('/developers/1/assets-licenses')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        type: 'asset',
        operation: 'replace',
        value: newAssets,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Developer assets updated successfully');
    expect(response.body.developer.assets).toHaveLength(1);
    expect(response.body.developer.assets[0].id).toBe('4');
  });

  it('should return a 404 error if developer not found', async () => {
    const response = await request(app)
      .put('/developers/99/assets-licenses')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        type: 'asset',
        operation: 'add',
        value: {
          id: '3',
          brand: 'Apple',
          model: 'MacBook Pro',
          type: 'laptop',
        },
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Developer not found');
  });

  it('should return a 400 error if type is invalid', async () => {
    const response = await request(app)
      .put('/developers/1/assets-licenses')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        type: 'invalid-type',
        operation: 'add',
        value: {
          id: '3',
          brand: 'Apple',
          model: 'MacBook Pro',
          type: 'laptop',
        },
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid type');
  });
});
