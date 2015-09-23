var http = require('http');
var request = require('request');
var querystring = require('querystring');
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

    before(function(done){
        app.listen(port,function(err,result){
            if(err){
                done(err);
            } else {
                done();
            }
        });
    });
    after(function(done){
        done();
    });

    it('should exist',function(done){
        should.exist(app);
        done();
    });

    it('should be listening at localhost:3000', function (done) {
        var headers = defaultGetOptions('/');
        http.get(headers, function (res) {
            res.statusCode.should.eql(200);
            done();
        });
    });
});

describe('/api/v1/authentication/',function(){
    it('POST valid username and password should return jwt',function(){
        var form = {
            'name':'Administrator',
            'password':'Admin'
        };
        var post_data = querystring.stringify(form);
        var post_options = defaultPostOptions(namespace + '/authentication',post_data);
        request({
            headers: post_options.headers,
            uri: 'http://localhost' + post_options.path,
            body: form,
            method:'POST'
        },function(err,res,body){
            expect.isTrue(body.success);
            expect.isEqual(body.message,'Enjoy your token!');
            expect.isDefined(body.token);
        });
    });
    it('POST invalid username and password should return auth failed',function(){
        var form = {
            'name':'Administrator',
            'password':'Admin'
        };
        var post_data = querystring.stringify(form);
        var post_options = defaultPostOptions(namespace + '/authentication',post_data);
        request({
            headers: post_options.headers,
            uri: 'http://localhost' + post_options.path,
            body: form,
            method:'POST'
        },function(err,res,body){
            expect.isFalse(body.success);
            expect.isEqual(body.message,'Authentication failed.');
            expect.isNotDefined(body.token);
        });
    });
});

describe('/api/v1/users',function(){
    before(function(){
        controller = require('./../controllers/users');
    });
    it('GET wihtout valid token should deny access',function(){
        var headers = defaultGetOptions(namespace+ '/users/');
        http.get(headers, function (res) {
            res.statusCode.should.eql(403);
            done();
        });
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
