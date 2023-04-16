import request from 'supertest';
import { app } from '../app'; // assumes your express app is exported from a module
import mockRequire from 'mock-require';
import jwt from 'jsonwebtoken';
const jwtToken = jwt.sign({ username: 'admin' }, 'secretKey');

describe('GET /assets', () => {
  beforeEach(() => {
    // Mock the AssetModel module
    mockRequire('../models/assets', {
      find: jest.fn().mockResolvedValue([
        {
          _id: '643b38b9ef4d91a675c6e6fe',
          brand: 'samsung',
          model: 'xiphire',
          type: 'laptop',
          createdAt: '2023-04-15T23:52:25.992Z',
          updatedAt: '2023-04-15T23:52:25.992Z',
        },
        {
          _id: '643b41e550acd94dd4f29aec',
          brand: 'asus',
          model: 'phiro',
          type: 'keyboard',
          createdAt: '2023-04-16T00:31:33.525Z',
          updatedAt: '2023-04-16T00:31:33.525Z',
        },
      ]),
    });
  });

  afterEach(() => {
    // Restore the original AssetModel module
    mockRequire.stopAll();
  });

  it('returns a list of assets', async () => {
    const response = await request(app)
      .get('/api/assets')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      assets: [
        {
          _id: '643b38b9ef4d91a675c6e6fe',
          brand: 'samsung',
          model: 'xiphire',
          type: 'laptop',
          createdAt: '2023-04-15T23:52:25.992Z',
          updatedAt: '2023-04-15T23:52:25.992Z',
        },
        {
          _id: '643b41e550acd94dd4f29aec',
          brand: 'asus',
          model: 'phiro',
          type: 'keyboard',
          createdAt: '2023-04-16T00:31:33.525Z',
          updatedAt: '2023-04-16T00:31:33.525Z',
        },
      ],
    });
  });
});
