import app from './index';
import request from 'supertest';


describe('GET / Ping Pong ', () => {
  it('Simple request to check health status', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
  });
  
});

