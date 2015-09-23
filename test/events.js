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

describe(namespace + '/events',function(){

    it('GET /');
    it('GET /:ID');
    it('POST /');
    it('POST /:ID');
    it('DELETE /:ID');

});
