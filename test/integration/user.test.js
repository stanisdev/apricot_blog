'use strict';

const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const App = require('../../src/services/app');
const config = require('../../src/config');
const db = require('../../src/db/models');
let server;

describe('Auth routes', () => {
  beforeAll(async () => {
    const app = new App(config);
    await app.build();
    await app.listen();
    server = app.server;
  });

  afterAll(async () => {
    server.close();
    await db.sequelize.close();
  });

  describe('POST /auth/register', () => {
    const newUser = {
      name: faker.name.findName(),
      email: 'kaden.bosco@hotmail.com',
      password: faker.internet.password()
    };

    test('should return 200 and successfully register user', async () => {
      const { body } = await request(server)
        .post('/auth/register')
        .send(newUser)
        .expect(httpStatus.OK);

      expect(body.success).toEqual(true);
      const user = await db.User.findOne({
        where: {
          email: newUser.email
        }
      });
      expect(user.email).toEqual(newUser.email);
      expect(typeof user.id).toBe('number');
    });
  });
});