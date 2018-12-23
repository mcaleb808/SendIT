'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../dist/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var token = '';
var key = 'x-access-token';
var fakeToken = '==eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU0MzE0NjU0OCwiZXhwIjoxNTQzNzUxMzQ4fQ.mQP9EKrFicqQUrFNfviMuj0HRBaVs0gx3g_e_aWRZUY';
var parcelId = '';

describe('root request', function () {
  describe('Get api documentation', function () {
    it('should return 200(success) status', function (done) {
      _chai2.default.request(_app2.default).get('/').end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });
});

//login and sign up tests
describe('POST /api/v1/auth/signup', function () {
  it('should return 400 - invalid email address', function (done) {
    var values = {
      email: 'mclebgmail.com',
      username: 'mcaleb808',
      fullName: 'mugisha caleb',
      userType: 'user',
      hashPassword: 'password'
    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(values).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - Email and Password', function (done) {
    var values = {
      email: 'mclebgmail.com',
      username: 'mcaleb808',
      fullName: 'mugisha caleb',
      userType: 'user',
      hashPassword: '222'
    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(values).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 201 - User created', function (done) {
    var newUser = {
      email: "mudydyd16@yahoo.fr",
      username: "mcalb",
      fullName: "kmamanzi rebecaa",
      password: "mcaleb"
    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(201);
      token = res.body.token;

      done();
    });
  });
  it('should return 400 - User with that EMAIL already exist', function (done) {
    var newUser = {
      email: "mudydyd16@yahoo.fr",
      username: "mcalb",
      fullName: "kmamanzi rebecaa",
      password: "mcaleb"
    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
});

describe('GET /api/v1/auth/login', function () {
  it('should return 400 - Some values are missing', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({ email: '', password: 'yyyyy' }).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - User not found', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({ email: 'mugisha', password: '222' }).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - wrong password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({ email: 'mudydyd16@yahoo.fr', password: 'mcaleb34' }).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 200 - Success', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({ email: 'mudydyd16@yahoo.fr', password: 'mcaleb' }).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

//parcels

describe('POST /api/v1/parcels', function () {
  it('should return 201 - parcel created', function (done) {
    var newParcel = {
      pickup: "kigali",
      destination: "butare",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mcl@gnf.com"

    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(newParcel).set(key, token).end(function (err, res) {

      _chai2.default.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
  it('should return 400 - invalid parcel', function (done) {
    var newParcel = {
      pickup: "kigali",
      destination: "butare",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mclgnf.com"

    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(newParcel).set(key, token).end(function (err, res) {

      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - incomplete parameters', function (done) {
    var newParcel = {
      destination: "b",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mcl@gnf.com"

    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(newParcel).set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - invalid token', function (done) {
    var newParcel = {
      pickup: "kigali",
      destination: "butare",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mcl@gnf.com"

    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(newParcel).set(key, fakeToken).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
});
describe('GET /api/v1/parcels', function () {
  it('should return 200 - Fetch all parcel delivery orders', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels').set(key, token).end(function (err, res) {
      parcelId = res.body.Parcels[0].id;
      _chai2.default.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 400 - Fetch all user parcel delivery orders', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels').set(key, fakeToken).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
});
describe('GET /api/v1/parcels/id', function () {
  it('should return 200 - Fetch a particular order', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels/' + parcelId).set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 400 - invalid token', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels/2').set(key, fakeToken).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
  it('should return 400 - no parcels', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels/1234').set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});

describe('PUT /api/v1/parcels/:id/destination', function () {
  it('should return 200 -  change destination of a parcel', function (done) {
    var edit = {
      destination: "test"
    };
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + parcelId + '/destination').set(key, token).send(edit).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(202);
      done();
    });
  });
  it('should return 400 - invalid token', function (done) {
    var edit = {
      destination: "test"
    };
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + parcelId + '/destination').set(key, fakeToken).send(edit).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
  it('should return 400 - no parcels', function (done) {
    var edit = {
      location: "test",
      status: 2
    };
    _chai2.default.request(_app2.default).put('/api/v1/parcels/1234/destination').set(key, token).send(edit).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
});
describe('PUT /api/v1/parcels', function () {
  it('should return 200 - destination changed', function (done) {
    var newParcel = {
      destination: "butare"
    };
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + parcelId + '/destination').send(newParcel).set(key, token).end(function (err, res) {

      _chai2.default.expect(res.statusCode).to.be.equal(202);
      done();
    });
  });
});

describe('GET /api/v1/parcels/id/cancel', function () {
  it('should return 200 - cancel a parcel', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + parcelId + '/cancel').set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 400 - invalid token', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + parcelId + '/cancel').set(key, fakeToken).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(500);
      done();
    });
  });
  it('should return 400 - no parcels', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/parcels/1234/cancel').set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});

//delete user created in test

describe('DELETE /api/v1/users/:userId', function () {
  it('should return 404 - User not found', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/user/xxx').set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 204 - User found', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/users').set(key, token).end(function (err, res) {
      _chai2.default.expect(res.statusCode).to.be.equal(204);
      done();
    });
  });
});