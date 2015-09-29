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
    request(app)
      .post(namespace + '/eventinvites/send')
      .set('x-access-token',jwt)
      .expect(200)
      .send({
        text : 'Yay, you have been invited to an event',
        from: 'develope@localhost.test',
        to: 'developer@localhost.test',
        cc : '',
        subject: 'New Event Invite',
        event_id: '5603d855e630f7142933764b',
        user_id: '56015ec68ff66340225e9b49'
      })
      .expect(function(res){
          res.body.should.have.property('success',true);
          res.body.should.have.property('data');
          res.body.data.should.be.instanceOf(Array);
          assert.equal(res.body.data.length,1);
          res.body.data[0].should.have.property('_id');
          res.body.data[0].should.have.property('event_id');
          res.body.data[0].should.have.property('user_id');
      })
      .expect(200)
      .end( done );
  });

});
