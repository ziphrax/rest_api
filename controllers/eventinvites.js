var eventInviteModel = require('./../models/eventinvite');
var eventModel = require('./../models/event');
var config = require('./../config');
var nodemailer  = require("nodemailer");

var node_env = process.env.NODE_ENV || 'development';

if(node_env == "development"){
  var stubTransport = require('nodemailer-stub-transport');
  var transporter = nodemailer.createTransport(stubTransport());
} else {
  var smtpTransport = require('nodemailer-smtp-transport');
  var transporter = nodemailer.createTransport("SMTP",{
     port: config.smtpPort,
     secure: false,
     ignoreTLS: true
   });
 }

module.exports = {
    sendInvite: function(req,res,next){
        eventModel.findOne({_id:req.body.event_id,owner:req.decoded._id}).exec(function(err,doc){
            if(err){                
                res.status(500).json({'success': false, data: err });
            } else if(doc){
                if(doc.owner == req.decoded._id){
                    transporter.sendMail({
                      from: 'sender@address',
                      to: 'receiver@address',
                      subject: 'New Event Invite!',
                      text: 'New Event Invite!'
                    },function(err,message){
                          if(err && node_env != "development"){
                              res.status(500).json({'success': false, data: err });
                          } else {
                              var invite = new eventInviteModel();
                              invite.event_id = req.body.event_id;
                              invite.user_id = req.body.user_id;
                              invite.sent = Date.now();
                              invite.save(function(err){
                                if(err){
                                  res.status(500).json({'success': false, data: err });
                                } else {
                                  res.json({'success': true, data: [invite] });
                                }
                              });
                          }
                      });
                } else {
                    res.status(401).json({ success: false, message: 'Authentication failed.' });
                }
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    }
}
