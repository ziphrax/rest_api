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

describe(namespace + '/users',function(){

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
        .get(namespace + '/users')
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
        .get(namespace + '/users/')
        .set('x-access-token','')
        .expect(401)
        .end( done );
    });

    it('GET /:ID',function(done){
      request(app)
        .get(namespace + '/users/5602dd318284c02405bf68a2')
        .set('x-access-token',jwt)
        .expect(200)
        .expect(function(res){
            res.body.should.have.property('success',true);
            res.body.should.have.property('data');
            res.body.data.should.be.instanceOf(Array);
            assert.equal(res.body.data.length,1);
        })
        .end( done );
    });

    it('POST /',function(done){
      request(app)
        .post(namespace + '/users/')
        .set('x-access-token',jwt)
        .send({
          name: 'User2',
        	firstName: 'String',
        	lastName: 'String',
        	EmailAddress: 'String',
        	DateOfBirth: Date.now(),
        	owner: 'String',
        	address : 'String',
        	phone_tel: 'String',
        	phone_mob: 'String',
        	phone_work: 'String',
        	admin: false,
        	password: 'password'
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
        .post(namespace + '/users/')
        .set('x-access-token','')
        .send({
          name: 'User2',
        	firstName: 'String',
        	lastName: 'String',
        	EmailAddress: 'String',
        	DateOfBirth: Date.now(),
        	owner: 'String',
        	address : 'String',
        	phone_tel: 'String',
        	phone_mob: 'String',
        	phone_work: 'String',
        	admin: false,
        	password: 'password'
        })
        .expect(401)
        .end( done );
    });

    it('POST /:ID',function(done){
      request(app)
        .post(namespace + '/users/5602dd318284c02405bf68a2')
        .set('x-access-token',jwt)
        .send({
        	firstName: 'String1',
        	lastName: 'String1',
        	EmailAddress: 'String1',
        	admin: false,
        	password: 'Admin'
        })
        .expect(200)
        .expect(function(res){
            res.body.should.have.property('success',true);
            res.body.should.have.property('data');
            res.body.data.should.be.instanceOf(Array);
            assert.equal(res.body.data.length,1);
            res.body.data[0].should.have.property('firstName','String1');
            res.body.data[0].should.have.property('lastName','String1');
            res.body.data[0].should.have.property('EmailAddress','String1');
            res.body.data[0].should.have.property('password','Admin');
        })
        .end( done );
    });

});
