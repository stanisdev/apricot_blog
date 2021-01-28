'use strict';

const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const getApp = require('../../src/app');
const db = require('../../src/db/models')
let server;

describe('Auth routes', () => {
  beforeAll(async () => {
    server = await getApp;
  });

  afterAll(async () => {
    server.close();
    await db.sequelize.close();
  });

  describe('POST /auth/register', () => {
    const newUser = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    };

    test('should return 200 and successfully register user', async () => {
      const { body } = await request(server)
        .post('/auth/register')
        .send(newUser)
        .expect(httpStatus.OK);

      expect(body.success).toEqual(true);
    });
  });
});