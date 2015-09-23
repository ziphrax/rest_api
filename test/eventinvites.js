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

describe( namespace + '/eventinvites' , function(){

  before(function(done){
    request(app)
        .post(namespace + '/authentication')
        .send({ name:'Administrator' , password:'Admin' })
        .end( function(err,res){
            jwt = res.body.token;
            done();
        });
  });

  it('should send event invites',function(done){
    this.timeout(10000);
    request(app)
      .post(namespace + '/eventinvites/send')
      .set('x-access-token',jwt)
      .send({
        text : 'Yay, you have been invited to an event',
        from: 'develope@localhost.test',
        to: 'developer@localhost.test',
        cc : '',
        subject: 'New Event Invite',
        event_id: '5603038ec84f48b8255d0e3f',
        user_id: '560301e77f44ecb8257bb0ca'
      })
      .expect(200)
      .expect(function(res){
          res.body.should.have.property('success',true);
          res.body.should.have.property('data');
          res.body.data.should.be.instanceOf(Array);
          assert.equal(res.body.data.length,1);
          res.body.data[0].should.have.property('_id');
          res.body.data[0].should.have.property('event_id');
          res.body.data[0].should.have.property('user_id');
      })
      .end( done );
  });

});
