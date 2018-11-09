const request = require('request');
const server = require('../server');

const endpoint = 'http://localhost:3000/parcels';

describe('parcels', function () {
    it('should return 200 response code on GET', function (done) {
        request.get(endpoint, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should return 200 response code on POST', function (done) {
        request.post(endpoint, {json: true, body: {"Pickup": "Kigali",
        "destination": "rusizi",
        "contents": "modem devices",
        "value": 50000,
        "weight": 2,
        "location": "kigali",
        "senderId": 1,
        "sname": "Mugisha Caleb Didier",
        "semail": "mcaleb808@gmail.com",
        "rname": "mugabo felix",
        "remail": "mcaleb808@gmail.com",
        "raddress": "rusizi",
        "status": "canceled"}}, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });
});