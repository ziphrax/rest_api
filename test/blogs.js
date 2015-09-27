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

  it('GET / should return a list of blogs');
  it('GET /:id should return a specific blog');
  it('GET /:id/comments should return a blogs comments');
  it('GET /recent should return the most recent blogs');
  it('POST / should create a new blog post');
  it('POST /:id should update a blog post');
  it('POST /:id/comments/ should add a comment to a blog');


});
