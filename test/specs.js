import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/app';

chai.use(chaiHttp);
let token = '';
let key ='x-access-token';
let fakeToken = '==eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU0MzE0NjU0OCwiZXhwIjoxNTQzNzUxMzQ4fQ.mQP9EKrFicqQUrFNfviMuj0HRBaVs0gx3g_e_aWRZUY';
let parcelId ='';

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

//login and sign up tests
describe('POST /api/v1/auth/signup', () => {
  it('should return 400 - invalid email address', (done) => {
    const values = {
      email: 'mclebgmail.com',
      username: 'mcaleb808',
      fullName: 'mugisha caleb',
      userType: 'user',
      hashPassword: 'password'
    };
    chai.request(app).post('/api/v1/auth/signup').send(values).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - Email and Password', (done) => {
    const values = {
      email: 'mclebgmail.com',
      username: 'mcaleb808',
      fullName: 'mugisha caleb',
      userType: 'user',
      hashPassword: '222'
    };
    chai.request(app).post('/api/v1/auth/signup').send(values).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 201 - User created', (done) => {
    const newUser = {
      email: "test1238@gmail.com",
      username: "mcalb",
      fullName: "kmamanzi rebecaa",
      userType: "admin",
      password: "mcaleb"
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(201);
      token = res.body.token;
      console.log(token);
      done();
    });
  });
});

describe('GET /api/v1/auth/login', () => {
  it('should return 400 - The credentials you provided is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: '', password: 'yyyyy' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - User not found', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'mugisha', password: '222' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 200 - Success', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'test1238@gmail.com', password: 'mcaleb' }).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

//parcels

describe('POST /api/v1/parcels', () => {
  it('should return 201 - parcel created', (done) => {
    const newParcel ={
      pickup: "kigali",
      destination: "butare",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mcl@gnf.com"

    };
    chai.request(app).post('/api/v1/parcels').send(newParcel).set(key,token).end((err, res) => {

      chai.expect(res.statusCode).to.be.equal(201);
      done();
    });
  });
  it('should return 400 - invalid parcel', (done) => {
    const newParcel ={
      pickup: "kigali",
      destination: "butare",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mclgnf.com"

    };
    chai.request(app).post('/api/v1/parcels').send(newParcel).set(key,token).end((err, res) => {

      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - incomplete parameters', (done) => {
    const newParcel ={
      destination: "b",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mcl@gnf.com"

    };
    chai.request(app).post('/api/v1/parcels').send(newParcel).set(key,token).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 400 - invalid token', (done) => {
    const newParcel ={
      pickup: "kigali",
      destination: "butare",
      weight: 2,
      receiver_name: "mvmvm",
      receiver_address: "dsdsds",
      receiver_email: "mcl@gnf.com"

    };
    chai.request(app).post('/api/v1/parcels').send(newParcel).set(key,fakeToken).end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  });
  describe('GET /api/v1/parcels', () => {
    it('should return 200 - Fetch all parcel delivery orders', (done) => {
      chai.request(app).get('/api/v1/parcels').set(key,token).end((err, res) => {
        parcelId = res.body.rows[0].id;
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 400 - Fetch all parcel delivery orders', (done) => {
      chai.request(app).get('/api/v1/parcels').set(key,fakeToken).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });
  describe('GET /api/v1/parcels/id', () => {
    it('should return 200 - Fetch a particular order', (done) => {
      chai.request(app).get(`/api/v1/parcels/${parcelId}`).set(key,token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 400 - invalid token', (done) => {
      chai.request(app).get('/api/v1/parcels/2').set(key,fakeToken).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
    it('should return 400 - no parcels', (done) => {
      chai.request(app).get('/api/v1/parcels/1234').set(key,token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  describe('GET /api/v1/parcels/id/cancel', () => {
    it('should return 200 - cancel a parcel', (done) => {
      chai.request(app).put(`/api/v1/parcels/${parcelId}/cancel`).set(key,token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 400 - invalid token', (done) => {
      chai.request(app).put(`/api/v1/parcels/${parcelId}/cancel`).set(key,fakeToken).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
    it('should return 400 - no parcels', (done) => {
      chai.request(app).put('/api/v1/parcels/1234/cancel').set(key,token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  describe('GET /api/v1/parcels/id/destination', () => {
    it('should return 200 - change destination of a parcel', (done) => {
      chai.request(app).put(`/api/v1/parcels/${parcelId}/cancel`).set(key,token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 400 - invalid token', (done) => {
      chai.request(app).put(`/api/v1/parcels/${parcelId}/cancel`).set(key,fakeToken).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
    it('should return 400 - no parcels', (done) => {
      chai.request(app).put('/api/v1/parcels/1234/cancel').set(key, token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });
  describe('POST /api/v1/parcels', () => {
    it('should return 200 - destination changed', (done) => {
      const newParcel ={
        destination: "butare"
      };
      chai.request(app).put(`/api/v1/parcels/${parcelId}/destination`).send(newParcel).set(key,token).end((err, res) => {
  
        chai.expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //delete user created in test

  describe('DELETE /api/v1/users/:userId', () => {
    it('should return 404 - User not found', (done) => {
      chai.request(app).delete(`/api/v1/users/12344`).set(key, token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
    it('should return 204 - User found', (done) => {
      chai.request(app).delete(`/api/v1/users`).set(key, token).end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(204);
        done();
      });
    });
  });