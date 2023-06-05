import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

import { app } from '../app';
import UserModel from '../database/models/Users';

const responseExpected = {
  id: 1,
  userName: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

describe('Testes no login de usuário', () => {
  afterEach(() => sinon.restore());
  it('Utilizando um login válido para verificar o status da página e se existe uma propriedade chamada token.', async () => {
    sinon.stub(UserModel, 'findOne').resolves(responseExpected as unknown as UserModel);
    sinon.stub(bcryptjs, 'compare').resolves(true);
    sinon.stub(jwt, 'sign').resolves('token');
    const responseObtained = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
    expect(responseObtained.status).to.equal(200);
    expect(responseObtained.body).to.haveOwnProperty('token');
  });
});
