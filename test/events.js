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

describe(namespace + '/events',function(){

  before(function(done){
    request(app)
        .post(namespace + '/authentication')
        .send({ name:'Administrator' , password:'Admin' })
        .end( function(err,res){
            jwt = res.body.token;
            done();
        });
  });

  it('GET / with auth should return an array',function(done){
    request(app)
      .get(namespace + '/events')
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

  it('GET / without auth should 401',function(done){
    request(app)
      .get(namespace + '/events/')
      .set('x-access-token','')
      .expect(401)
      .end( done );
  });

  it('POST /',function(done){
    request(app)
      .post(namespace + '/events/')
      .set('x-access-token',jwt)
      .send({
        title : 'String',
        content: 'String',
        owner: '56015ec68ff66340225e9b49',
        longitude : 0,
        lattitude: 0,
        address : 'String'
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

  it('POST / without auth should error',function(done){
    request(app)
      .post(namespace + '/events/')
      .set('x-access-token','')
      .send({
        title : 'String',
        content: 'String',
        owner: 'String',
        longitude : 0,
        lattitude: 0,
        address : 'String'
      })
      .expect(401)
      .end( done );
  });

  it('POST /:ID',function(done){
    request(app)
      .post(namespace + '/events/5603d855e630f7142933764c')
      .set('x-access-token',jwt)
      .send({
        title : 'String',
        content: 'String',
        longitude : 0,
        lattitude: 0,
        address : 'String'
      })
      .expect(200)
      .expect(function(res){
          res.body.should.have.property('success',true);
          res.body.should.have.property('data');
          res.body.data.should.be.instanceOf(Array);
          assert.equal(res.body.data.length,1);
          res.body.data[0].should.have.property('title','String');
          res.body.data[0].should.have.property('content','String');
          res.body.data[0].should.have.property('owner','56015ec68ff66340225e9b49');
          res.body.data[0].should.have.property('longitude',0);
          res.body.data[0].should.have.property('lattitude',0);
          res.body.data[0].should.have.property('address','String');
      })
      .end( done );
  });

});
