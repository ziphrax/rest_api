var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = require('should');
var namespace = '/api/v1';
var app = require(__dirname + '/../server.js');
var port = 3001;
var controller;
var jwt = '';

describe(namespace + '/programmes',function(){
  before(function(done){
    request(app)
        .post(namespace + '/authentication')
        .send({ name:'Administrator' , password:'Admin' })
        .end( function(err,res){
            jwt = res.body.token;
            done();
        });
  });

  it('GET / should return an array of programmes',function(done){
      request(app)
        .get(namespace + '/programmes')
        .set('x-access-token',jwt)
        .expect('Content-Type',/json/)
        .expect(200)
        .expect(function(res){
            res.body.should.have.property('success',true);
            res.body.should.have.property('data');
            res.body.data.should.be.instanceOf(Array);
        })
        .end( done );
  });
  it('GET /:id should return a specific programme',function(done){
      request(app)
        .get(namespace + '/programmes/560a7ac5cb547acc23df677f')
        .set('x-access-token',jwt)
        .expect('Content-Type',/json/)
        .expect(200)
        .expect(function(res){
            res.body.should.have.property('success',true);
            res.body.should.have.property('data');
            res.body.data.should.be.instanceOf(Array);
            assert.equal(res.body.data.length,1);
        })
        .end( done );
  });
  it('POST / should create a new programme',function(done){
    request(app)
      .post(namespace + '/programmes')
      .set('x-access-token',jwt)
      .send({
          owner: '56015ec68ff66340225e9b49',
          name: 'name'
      })
      .expect(200)
      .expect(function(res){
          res.body.should.have.property('success',true);
          res.body.should.have.property('data');
          res.body.data.should.be.instanceOf(Array);
          assert.equal(res.body.data.length,1);
          res.body.data[0].should.have.property('_id');
      })
      .end( done );
  });
  it('POST /:id should update a programme',function(done){
    request(app)
      .post(namespace + '/programmes/560a7ac5cb547acc23df677f')
      .set('x-access-token',jwt)
      .send({
          name: 'name'
      })
      .expect(200)
      .expect(function(res){
          res.body.should.have.property('success',true);
          res.body.should.have.property('data');
          res.body.data.should.be.instanceOf(Array);
          assert.equal(res.body.data.length,1);
          res.body.data[0].should.have.property('_id');
      })
      .end( done );
  });

});
