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

describe(namespace + '/reports',function(){
  before(function(done){
    request(app)
        .post(namespace + '/authentication')
        .send({ name:'Administrator' , password:'Admin' })
        .end( function(err,res){
            jwt = res.body.token;
            done();
        });
  });

  it('GET / should return an array of reports',function(done){
      request(app)
        .get(namespace + '/reports')
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
  it('GET /:id should return a specific report',function(done){
      request(app)
        .get(namespace + '/reports/560bdb481bf9289419d43ff7')
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
  it('POST / should create a new report',function(done){
    request(app)
      .post(namespace + '/reports')
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
  it('POST /:id should update a report',function(done){
    request(app)
      .post(namespace + '/reports/560bdb481bf9289419d43ff7')
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
