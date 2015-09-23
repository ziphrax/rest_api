var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = require('should');
var namespace = '/api/v1';
var app = require(__dirname + '/../server.js');
var port = 3000;
var controller;
var jwt = '';

describe('app',function(){

    it('should exist',function(done){
        should.exist(app);
        done();
    });

    it('should be listening at localhost:3000', function (done) {
        request(app)
            .get('/')
            .expect( 200 , done );
    });

});

describe( namespace + '/authentication' , function(){
    it('should respond with auth token' , function(done){
        request(app)
            .post(namespace + '/authentication')
            .send({ name:'Administrator' , password:'Admin' })
            .expect( 200 )
            .expect(function(res){
                jwt = res.body.token;
                res.body.should.have.property('token');
            })
            .end( done );
    });
    it('with incorrect username should error' , function(done){
        request(app)
            .post(namespace + '/authentication')
            .send({ name:'Administrator2' , password:'Admin' })
            .expect( 401 )
            .expect(function(res){
                res.body.should.have.property('success',false);
                res.body.should.have.property('message','Authentication failed.');
            })
            .end( done );
    });
    it('with incorrect password should error' , function(done){
        request(app)
            .post(namespace + '/authentication')
            .send({ name:'Administrator' , password:'Admin2' })
            .expect( 401 )
            .expect(function(res){
                res.body.should.have.property('success',false);
                res.body.should.have.property('message','Authentication failed.');
            })
            .end( done );
    });
});


function defaultPostOptions(path,post_data){
    var options = {
      "host": "localhost",
      "port": port,
      "path": path,
      "method": "POST",
      "headers": {
        "x-access-token": jwt,
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": post_data.length
      }
    };
    return options;
}

function defaultGetOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "x-access-token": jwt
    }
  };
  return options;
}
