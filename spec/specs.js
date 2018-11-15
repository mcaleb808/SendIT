'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../dist/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe('PARCELS', function () {
  describe('Get all parcels', function () {
    it('should return an object of all parcels', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/parcels').end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });
  describe('Get one parcel with id 1', function () {
    it('should return one parcel object', function (done) {
      var id = 1;
      _chai2.default.request(_app2.default).get('/api/v1/parcels/' + id).end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });
  describe('Get one parcel with id 10', function () {
    it('should return error', function (done) {
      var id = 10;
      _chai2.default.request(_app2.default).get('/api/v1/parcels/' + id).end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(400);
        _chai2.default.expect(res.body.message).to.equal('The parcel with given ID was not found');
        done();
      });
    });
  });
  describe('adding a parcel', function () {
    it('should add new parcel', function (done) {
      var parcel = {
        Pickup: "rwamagana",
        location: "muhanga",
        destination: "rusizi",
        contents: "modem devices",
        value: 50000,
        weight: 1,
        sname: "mugisha caleb didier",
        senderId: "2",
        semail: "mcaleb808@gmail.com",
        rname: "mugabo felix",
        raddress: "rusizi",
        remail: "mcaleb808@gmail.com",
        status: "delivered"
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(200);

        done();
      });
    });
  });

  describe('adding invalid parcel', function () {
    it('should fail to add new parcel', function (done) {
      var parcel = {
        Pickup: "rwamagana",
        location: "muhanga",
        homeadrress: "rusizi",
        contents: "modem devices",
        value: 50000,
        weight: 1,
        sname: "mugisha caleb didier",
        senderId: "2",
        semail: "mcaleb808@gmail.com"
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(400);

        done();
      });
    });
  });
  describe('Delete a parcel with id 1', function () {
    it('should return one parcel object', function (done) {
      var id = 1;
      _chai2.default.request(_app2.default).delete('/api/v1/parcels/' + id).end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(200);

        done();
      });
    });
  });
  describe('Delete a parcel that doesnot exist', function () {
    it('should fail to delete a parcel', function (done) {
      var id = 10;
      _chai2.default.request(_app2.default).delete('/api/v1/parcels/' + id).end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(400);
        _chai2.default.expect(res.body.message).to.equal('The parcel with given ID was not found');
        done();
      });
    });
  });
  describe('cancel a parcel with id 1', function () {
    it('should cancel an order', function (done) {
      var id = 1;
      _chai2.default.request(_app2.default).put('/api/v1/parcels/1/cancel').end(function (err, res) {
        _chai2.default.expect(res.statusCode).to.be.equal(400);
        _chai2.default.expect(res.body.message).to.equal('The parcel with given ID was not found');
        done();
      });
    });
  });
  describe('cancel a parcel with id 10', function () {
    it('should fail to cancel an order', function (done) {
      var id = 10;
      _chai2.default.request(_app2.default).put('/api/v1/parcels/' + id + '/cancel').end(function (err, res) {
        _chai2.default.expect(res.status).to.equal(400);
        _chai2.default.expect(res.body.message).to.equal('The parcel with given ID was not found');
        done();
      });
    });
  });
});

describe('USERS', function () {
  describe('list all users', function () {
    it('should list all users', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/users').end(function (err, res) {
        _chai2.default.expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('register new user', function () {
    it('should register a new user', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users').set('content-type', 'application/json').send({
        names: 'Mugisha Caleb Didier',
        username: 'caleb123',
        email: 'mcaleb@gmail.com',
        password: 'caleb123'
      }).end(function (err, res) {
        _chai2.default.expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('list all user parcels', function () {
    it('should list all user parcels', function (done) {
      var senderId = 1;
      _chai2.default.request(_app2.default).get('/api/v1/users/' + senderId + '/parcels').end(function (err, res) {
        _chai2.default.expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('list all user parcels', function () {
    it('should list all user parcels', function (done) {
      var senderId = 1;
      _chai2.default.request(_app2.default).get('/api/v1/users/' + senderId + '/parcels').end(function (err, res) {
        _chai2.default.expect(res.status).to.equal(400);
        done();
      });
    });
  });
});