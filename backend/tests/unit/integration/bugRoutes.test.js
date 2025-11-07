const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const bugRoutes = require('../../src/routes/bugRoutes');
const Bug = require('../../src/models/Bug');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
});

afterEach(async () => {
  await Bug.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Bug API', () => {
  it('should create a bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Crash', description: 'App crashes', reportedBy: 'Jane' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Crash');
  });

  it('should get all bugs', async () => {
    await Bug.create({ title: 'Test', description: 'test', reportedBy: 'x' });
    const res = await request(app).get('/api/bugs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});