import request from 'supertest';

import {
  postUsers,putUsers, incompleteData, improperData, expectedData, unwantedParams, postUsers2,
} from './specData';
import app from '../dist/app';

describe('get all users', () => {
  it('should respond with a 200 success', (done) => {
    request(app)
      .get('/api/v1/users')
      .expect(200)
      .expect((res) => {
        expect(response.statusCode).toEqual(200);
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 404(not found)', (done) => {
    request(app)
      .get('/api/v1/users/45')
      .expect(404)
      .expect((res) => {
        expect(response.statusCode).toEqual(404);
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 404(not found)', (done) => {
    request(app)
      .delete('/api/v1/users/45')
      .expect(404)
      .expect((res) => {
        expect(response.statusCode).toEqual(404);
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 200(success)', (done) => {
    request(app)
      .delete('/api/v1/users/1')
      .expect(200)
      .expect((res) => {
        expect(response.statusCode).toEqual(200);
      })
      .end(() => {
        done();
      });
  });

    it('should respond with 400(bad rq)', (done) => {
    request(app)
      .get('/api/v1/users/gjdj')
      .expect(400)
      .expect((res) => {
        expect(response.statusCode).toEqual(400);
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 200 success', (done) => {
    request(app)
      .get('/api/v1/users/1')
      .expect(200)
      .expect((res) => {
        expect(response.statusCode).toEqual(200);
      })
      .end(() => {
        done();
      });
  });
  it('should respond with a 200 success', (done) => {
    request(app)
      .get('/api/v1/users/1/parcels')
      .expect(200)
      .expect((res) => {
        expect(response.statusCode).toEqual(200);
      })
      .end(() => {
        done();
      });
  });

});



describe('cancel-parcel-', () => {
  it('should respond with a 404 (Not found) ', (done) => {
    request(app)
      .put('/api/v1/parcels/abc/cancel')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('The parcel with given ID was not found');
      })
      .end(() => {
        done();
      });
  });
});

it('should respond with a 200 (success) status', (done) => {
  request(app)
    .put('/api/v1/parcels/1/cancel')
    .expect((res) => {
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('canceled');
    })
    .end(() => {
      done();
    });
});



describe('create user', () => {
  it('should respond with a 400 (Bad request) status code if all required parameters are not provided by a user', (done) => {
    request(app)
      .post('/api/v1/users')
      .send(postUsers2)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toMatch(400);
      })
      .end(() => {
        done();
      });
  });
it('should respond with a 200 success status ', (done) => {
    request(app)
      .post('/api/v1/users/users')
      .send(postUsers)
      .expect(200)
      .expect((res) => {
        const dataKeys = Object.keys(res.body);
        expect(datakeys).toEqual(jasmine.arrayContaining(['names', 'username', 'email', 'password']));
      })
      .end(() => {
        done();
      });
  });
});
  



describe('create parcel delivery order', () => {
  it('should respond with a 400 (Bad request) status code if all required parameters are not provided by a user', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .send(incompleteData)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toMatch(400);
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 400 (Bad request) status code if unwanted parameters are provided by a user', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .send(unwantedParams)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toMatch(400);
      })
      .end(() => {
        done();
      });
  });


  it('should respond with a 400 (Bad request) status code if the data is improper', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .send(improperData)
      .expect(400)
      .end(() => {
        done();
      });
  });

  it('should respond with a 200 success status ', (done) => {
    request(app)
      .post('/api/v1/parcels')
      .send(expectedData)
      .expect(200)
      .expect((res) => {
        const dataKeys = Object.keys(res.body);
        expect(datakeys).toEqual(jasmine.arrayContaining(['userId', 'status', 'pickupAddress', 'deliveryAddress', 'deliveryTime', 'parcelDescription']));
      })
      .end(() => {
        done();
      });
  });
});

describe('fetch all parcel delivery orders', () => {
  it('should respond with a 200 success status ', (done) => {
    request(app)
      .get('/api/v1/parcels')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(jasmine.arrayContaining([jasmine.any(Object)]));
      })
      .end(() => { done(); });
  });
});

describe('GET all parcel delivery orders for a specific user', () => {
  it('should respond with a 404 (Not found) status ', (done) => {
    request(app)
    // request with an invalid user id : 'aaaak'
      .get('/api/v1/users/1/parcels')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('No orders found for user');
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 200 (success) status ', (done) => {
    request(app)
      .get('/api/v1/users/1/parcels')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(jasmine.arrayContaining([jasmine.any(Object)]));
      })
      .end(() => {
        done();
      });
  });
});

describe('fetch-specific-delivery-order endpoint', () => {
  it('should respond with a 404 (Not found) status code if the order is not found', (done) => {
    request(app)
    // request with invalid parcel id : 7777
      .get('/api/v1/parcels/7777')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('The parcel with given ID was not found');
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 200 success status code if the order is found', (done) => {
    request(app)
      .get('/api/v1/parcels/1')
      .expect(200)
      .expect((res) => {
        const dataKeys = Object.keys(res.body);
        expect(dataKeys).toEqual(jasmine.arrayContaining(['id', 'pickup', 'destination', 'contents', 'value', 'weight', 'location', 'senderId', 'sname', 'semail', 'rname', 'remail', 'raddress', 'status']));
      })

      .end(() => {
        done();
      });
  });

it('should respond with a 404(not found)', (done) => {
    request(app)
      .delete('/api/v1/parcels/45')
      .expect(404)
      .expect((res) => {
        expect(response.statusCode).toEqual(404);
      })
      .end(() => {
        done();
      });
  });

  it('should respond with a 200(success)', (done) => {
    request(app)
      .delete('/api/v1/parcels/2')
      .expect(200)
      .expect((res) => {
        expect(response.statusCode).toEqual(200);
      })
      .end(() => {
        done();
      });
    });


});


