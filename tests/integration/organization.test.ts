import request from 'supertest';
import { createApp } from '../../src/app';
import { sequelize } from '../../src/models/index';

const app = createApp();

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Organization API', () => {
  describe('POST /api/organizations', () => {
    it('creates an organization and returns 201', async () => {
      const res = await request(app).post('/api/organizations').send({ orgname: 'Test Corp' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.orgname).toBe('Test Corp');
      expect(res.body.data.id).toBeDefined();
    });

    it('returns 400 when orgname is missing', async () => {
      const res = await request(app).post('/api/organizations').send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/organizations', () => {
    it('returns a paginated list of organizations', async () => {
      const res = await request(app).get('/api/organizations').query({ page: 1, limit: 10 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.meta).toMatchObject({ page: 1, limit: 10 });
    });
  });

  describe('GET /api/organizations/:id', () => {
    it('retrieves an existing organization', async () => {
      const createRes = await request(app)
        .post('/api/organizations')
        .send({ orgname: 'Find Me Corp' });
      const id: number = createRes.body.data.id as number;

      const res = await request(app).get(`/api/organizations/${id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(id);
    });

    it('returns 404 for a non-existent organization', async () => {
      const res = await request(app).get('/api/organizations/999999');

      expect(res.status).toBe(404);
      expect(res.body.code).toBe('NOT_FOUND');
    });
  });

  describe('PATCH /api/organizations/:id', () => {
    it('updates an organization and returns the updated record', async () => {
      const createRes = await request(app)
        .post('/api/organizations')
        .send({ orgname: 'Old Name' });
      const id: number = createRes.body.data.id as number;

      const res = await request(app)
        .patch(`/api/organizations/${id}`)
        .send({ orgname: 'New Name' });

      expect(res.status).toBe(200);
      expect(res.body.data.orgname).toBe('New Name');
    });
  });

  describe('DELETE /api/organizations/:id', () => {
    it('deletes an organization and returns 204', async () => {
      const createRes = await request(app)
        .post('/api/organizations')
        .send({ orgname: 'Delete Me Corp' });
      const id: number = createRes.body.data.id as number;

      const res = await request(app).delete(`/api/organizations/${id}`);

      expect(res.status).toBe(204);
    });
  });
});
