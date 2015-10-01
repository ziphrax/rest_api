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

describe(namespace + '/blogs',function(){
  before(function(done){
    request(app)
        .post(namespace + '/authentication')
        .send({ name:'Administrator' , password:'Admin' })
        .end( function(err,res){
            jwt = res.body.token;
            done();
        });
  });

  it('GET / should return an array of blogs',function(done){
      request(app)
        .get(namespace + '/blogs')
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
  it('GET /:id should return a specific blog',function(done){
      request(app)
        .get(namespace + '/blogs/560a7ac5cb547acc23df677f')
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
  it('GET /:id/comments should return a blogs comments',function(done){
      request(app)
        .get(namespace + '/blogs/560a7ac5cb547acc23df677f/comments/')
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
  it('GET /recent should return the 5 most recent blogs',function(done){
      request(app)
        .get(namespace + '/blogs/recent')
        .set('x-access-token',jwt)
        .expect('Content-Type',/json/)
        .expect(200)
        .expect(function(res){
            res.body.should.have.property('success',true);
            res.body.should.have.property('data');
            res.body.data.should.be.instanceOf(Array);
            assert.equal(res.body.data.length,5);
        })
        .end( done );
  });
  it('POST / should create a new blog post',function(done){
    request(app)
      .post(namespace + '/blogs')
      .set('x-access-token',jwt)
      .send({
          subject: 'blog subject',
          content: 'blog content'
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
  it('POST /:id should update a blog post',function(done){
    request(app)
      .post(namespace + '/blogs/560a7ac5cb547acc23df677f')
      .set('x-access-token',jwt)
      .send({
          subject: 'blog subject 2',
          content: 'blog content 2'
      })
      .expect(200)
      .expect(function(res){
          res.body.should.have.property('success',true);
          res.body.should.have.property('data');
          res.body.data.should.be.instanceOf(Array);
          assert.equal(res.body.data.length,1);
          res.body.data[0].should.have.property('_id');
          res.body.data[0].should.have.property('subject','blog subject 2');
          res.body.data[0].should.have.property('content','blog content 2');
      })
      .end( done );
  });
  it('POST /:id/comments/ should add a comment to a blog',function(done){
    request(app)
      .post(namespace + '/blogs/560a7ac5cb547acc23df677f/comments')
      .set('x-access-token',jwt)
      .send({
          subject: 'comment subject',
          content: 'comment content'
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
