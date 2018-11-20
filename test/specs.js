import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/app';

chai.use(chaiHttp);


describe('root request', () => {
  describe('Get api documentation', () => {
    it('should return 200(success) status', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  
  describe('bad request', () => {
    it('should return 404(Not found) staus', (done) => {
      chai
        .request(app)
        .get('/bc')
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(404);
          done();
        });
    });
  });
  
});

describe('PARCELS', () => {
  describe('Get all parcels', () => {
    it('should return an object of all parcels', (done) => {
      chai
        .request(app)
        .get('/api/v1/parcels')
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  describe('Get one parcel with id 1', () => {
    it('should return one parcel object', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  describe('Get one parcel with id 10', () => {
    it('should return 400 status', (done) => {
      const id = 10;
      chai
        .request(app)
        .get(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.message).to.equal('The parcel with given ID was not found');
          done();
        });
    });
  });
  describe('adding a parcel', () => {
    it('should add new parcel', (done) => {
      const parcel = {
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
      chai
        .request(app)
        .post('/api/v1/parcels')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
    it('should fail to add parcel', (done) => {
      const parcel = {
        Pickup: "rwamagana",
        location: "muhanga",
        destination: "rusizi",
        contents: "modem devices",
        value: "5000",
        weight: 1,
        sname: "mugisha caleb didier",
        senderId: "2",
        semail: "mcaleb808com",
        rname: "mugabo felix"
      };
      chai
        .request(app)
        .post('/api/v1/parcels')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
    it('should update parcel 1', (done) => {
      const parcel = {
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
      chai
        .request(app)
        .put('/api/v1/parcels/1')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
    it('should fail to update parcel 10', (done) => {
      const parcel = {
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
      chai
        .request(app)
        .put('/api/v1/parcels/10')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
    it('invalid email', (done) => {
      const parcel = {
        contents: "modem devices",
        value: 50000,
        weight: 1,
        sname: "mugisha caleb didier",
        senderId: "2",
        semail: "mcaleb80com",
        rname: "mugabo felix",
        raddress: "rusizi",
        remail: "mcaleb808@gmail.com",
        status: "delivered"
      };
      chai
        .request(app)
        .put('/api/v1/parcels/1')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
  });
  
  describe('adding invalid parcel', () => {
    it('missing parameters', (done) => {
      const parcel = {
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
      chai
        .request(app)
        .post('/api/v1/parcels')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
    it('invalid email', (done) => {
      const parcel = {
        contents: "modem devices",
        value: 50000,
        weight: 1,
        sname: "mugisha caleb didier",
        senderId: "2",
        semail: "mcaleb80com",
        rname: "mugabo felix",
        raddress: "rusizi",
        remail: "mcaleb808@gmail.com",
        status: "delivered"
      };
      chai
        .request(app)
        .put('/api/v1/parcels/1')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
    it('Receiver name must be 3 characters or more', (done) => {
      const parcel = {
        contents: "modem devices",
        value: 50000,
        weight: 1,
        sname: "mugisha caleb didier",
        senderId: 2,
        semail: "mcaleb808@gmail.com",
        rname: "m",
        raddress: "rusizi",
        remail: "mcaleb808@gmail.com",
        status: "delivered"
      };
      chai
        .request(app)
        .post('/api/v1/parcels')
        .send(parcel)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
  });
  describe('cancel a parcel with id 1', () => {
    it('should cancel an order', (done) => {
      const id = 1;
      chai
        .request(app)
        .put(`/api/v1/parcels/${id}/cancel`)
        .set('content-type', 'application/json')
        .send({
          status: 'canceled'
        })
          .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
    it('should cancel an order', (done) => {
      const id = 1;
      chai
        .request(app)
        .put(`/api/v1/parcels/${id}/cancel`)
        .set('content-type', 'application/json')
        .send({
          status: 1
        })
          .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
  describe('cancel a parcel with id 10', () => {
    it('should fail to cancel an order', (done) => {
      const id = 10;
      chai
        .request(app)
        .put(`/api/v1/parcels/${id}/cancel`)
        .set('content-type', 'application/json')
        .send({
          status: 'canceled'
        })
         .end((err, res) => {
          chai.expect(res.status).to.equal(400);
          chai.expect(res.body.message).to.equal('The parcel with given ID was not found');
          done();
        });
    });
  });
  describe('Delete a parcel with id 1', () => {
    it('should return one parcel object', (done) => {
      const id = 1;
      chai
        .request(app)
        .delete(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
  });
  describe('Delete a parcel that does not exist', () => {
    it('should fail to delete a parcel', (done) => {
      const id = 10;
      chai
        .request(app)
        .delete(`/api/v1/parcels/${id}`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.equal(400);
          chai.expect(res.body.message).to.equal('The parcel with given ID was not found');
          done();
        });
    });
  });
});




describe('USERS', () => {
  describe('list all users', () => {
    it('should list all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          chai.expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('register new user', () => {
    it('should register a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send({
            names: 'Mugisha Caleb Didier',
            username: 'caleb123',
            email: 'mcaleb@gmail.com',
            password: 'caleb123'
        })
        .end((err, res) => {
          chai.expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('should fail to register a new user', () => {
    it('name must be a string', (done) => {
      chai
        .request(app)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send({
            names: 1,
            username: 'caleb123',
            email: 'mcaleb@gmail.com',
            password: 'caleb123'
        })
        .end((err, res) => {
          chai.expect(res.status).to.equal(400);
          done();
        });
    });
    it('invalid email ', (done) => {
      chai
        .request(app)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send({
            names: 'Mugisha Caleb Didier',
            username: 'caleb123',
            email: 'mcalebcom',
            password: 'caleb123'
        })
        .end((err, res) => {
          chai.expect(res.status).to.equal(400);
          done();
        });
    });
    it('missing parameters', (done) => {
      chai
        .request(app)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send({
            names: 'Mugisha Caleb Didier'
        })
        .end((err, res) => {
          chai.expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('update a user', () => {
    it('should update user id:1', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/1')
        .set('content-type', 'application/json')
        .send({
            names: 'Mugisha Caleb Didier',
            email: 'mcaleb@gmail.com'
        })
        .end((err, res) => {
          chai.expect(res.status).to.equal(200);
          done();
        });
    });
  });
  
  describe('list all user parcels', () => {
    it('should list all user parcels', (done) => {
      const senderId= 1;
      chai
        .request(app)
        .get('/api/v1/users/1/parcels')
        .end((err, res) => {
          chai.expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('list all userid:10 parcels', () => {
    it('should fail to list all user parcels', (done) => {
      const senderId= 10;
      chai
        .request(app)
        .get(`/api/v1/users/${senderId}/parcels`)
        .end((err, res) => {
          chai.expect(res.status).to.equal(400);
          done();
        });
    });
  });
});