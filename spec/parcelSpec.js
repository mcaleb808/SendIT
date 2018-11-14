'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _specData = require('./specData');

var _app = require('../dist/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('get all users', function () {
  it('should respond with a 200 success', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users').expect(200).expect(function (res) {
      expect(response.statusCode).toEqual(200);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 404(not found)', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/45').expect(404).expect(function (res) {
      expect(response.statusCode).toEqual(404);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 404(not found)', function (done) {
    (0, _supertest2.default)(_app2.default).delete('/api/v1/users/45').expect(404).expect(function (res) {
      expect(response.statusCode).toEqual(404);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 200(success)', function (done) {
    (0, _supertest2.default)(_app2.default).delete('/api/v1/users/1').expect(200).expect(function (res) {
      expect(response.statusCode).toEqual(200);
    }).end(function () {
      done();
    });
  });

  it('should respond with 400(bad rq)', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/gjdj').expect(400).expect(function (res) {
      expect(response.statusCode).toEqual(400);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 200 success', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/1').expect(200).expect(function (res) {
      expect(response.statusCode).toEqual(200);
    }).end(function () {
      done();
    });
  });
  it('should respond with a 200 success', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/1/parcels').expect(200).expect(function (res) {
      expect(response.statusCode).toEqual(200);
    }).end(function () {
      done();
    });
  });
});

describe('cancel-parcel-', function () {
  it('should respond with a 404 (Not found) ', function (done) {
    (0, _supertest2.default)(_app2.default).put('/api/v1/parcels/abc/cancel').expect(404).expect(function (res) {
      expect(res.body.message).toBe('The parcel with given ID was not found');
    }).end(function () {
      done();
    });
  });
});

it('should respond with a 200 (success) status', function (done) {
  (0, _supertest2.default)(_app2.default).put('/api/v1/parcels/1/cancel').expect(function (res) {
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('canceled');
  }).end(function () {
    done();
  });
});

describe('create user', function () {
  it('should respond with a 400 (Bad request) status code if all required parameters are not provided by a user', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users').send(_specData.postUsers2).expect(400).expect(function (res) {
      expect(res.body.message).toMatch(400);
    }).end(function () {
      done();
    });
  });
  it('should respond with a 200 success status ', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/users/users').send(_specData.postUsers).expect(200).expect(function (res) {
      var dataKeys = Object.keys(res.body);
      expect(datakeys).toEqual(jasmine.arrayContaining(['names', 'username', 'email', 'password']));
    }).end(function () {
      done();
    });
  });
});

describe('create parcel delivery order', function () {
  it('should respond with a 400 (Bad request) status code if all required parameters are not provided by a user', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/parcels').send(_specData.incompleteData).expect(400).expect(function (res) {
      expect(res.body.message).toMatch(400);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 400 (Bad request) status code if unwanted parameters are provided by a user', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/parcels').send(_specData.unwantedParams).expect(400).expect(function (res) {
      expect(res.body.message).toMatch(400);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 400 (Bad request) status code if the data is improper', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/parcels').send(_specData.improperData).expect(400).end(function () {
      done();
    });
  });

  it('should respond with a 200 success status ', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/parcels').send(_specData.expectedData).expect(200).expect(function (res) {
      var dataKeys = Object.keys(res.body);
      expect(datakeys).toEqual(jasmine.arrayContaining(['userId', 'status', 'pickupAddress', 'deliveryAddress', 'deliveryTime', 'parcelDescription']));
    }).end(function () {
      done();
    });
  });
});

describe('fetch all parcel delivery orders', function () {
  it('should respond with a 200 success status ', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/parcels').expect(200).expect(function (res) {
      expect(res.body).toEqual(jasmine.arrayContaining([jasmine.any(Object)]));
    }).end(function () {
      done();
    });
  });
});

describe('GET all parcel delivery orders for a specific user', function () {
  it('should respond with a 404 (Not found) status ', function (done) {
    (0, _supertest2.default)(_app2.default)
    // request with an invalid user id : 'aaaak'
    .get('/api/v1/users/1/parcels').expect(404).expect(function (res) {
      expect(res.body.message).toBe('No orders found for user');
    }).end(function () {
      done();
    });
  });

  it('should respond with a 200 (success) status ', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/users/1/parcels').expect(200).expect(function (res) {
      expect(res.body).toEqual(jasmine.arrayContaining([jasmine.any(Object)]));
    }).end(function () {
      done();
    });
  });
});

describe('fetch-specific-delivery-order endpoint', function () {
  it('should respond with a 404 (Not found) status code if the order is not found', function (done) {
    (0, _supertest2.default)(_app2.default)
    // request with invalid parcel id : 7777
    .get('/api/v1/parcels/7777').expect(404).expect(function (res) {
      expect(res.body.message).toBe('The parcel with given ID was not found');
    }).end(function () {
      done();
    });
  });

  it('should respond with a 200 success status code if the order is found', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/parcels/1').expect(200).expect(function (res) {
      var dataKeys = Object.keys(res.body);
      expect(dataKeys).toEqual(jasmine.arrayContaining(['id', 'pickup', 'destination', 'contents', 'value', 'weight', 'location', 'senderId', 'sname', 'semail', 'rname', 'remail', 'raddress', 'status']));
    }).end(function () {
      done();
    });
  });

  it('should respond with a 404(not found)', function (done) {
    (0, _supertest2.default)(_app2.default).delete('/api/v1/parcels/45').expect(404).expect(function (res) {
      expect(response.statusCode).toEqual(404);
    }).end(function () {
      done();
    });
  });

  it('should respond with a 200(success)', function (done) {
    (0, _supertest2.default)(_app2.default).delete('/api/v1/parcels/2').expect(200).expect(function (res) {
      expect(response.statusCode).toEqual(200);
    }).end(function () {
      done();
    });
  });
});