var friendModel = require('./../models/friend');
var config = require('./../config');
var nodemailer  = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport("SMTP",{
   port: config.smtpPort,
   secure: false,
   ignoreTLS: true
 });

module.exports = {
    makeFriends: function(req,res,next){
      transporter.sendMail({
        from: 'sender@address',
        to: 'receiver@address',
        subject: 'hello',
        text: 'hello world!'
      },function(err,message){
            if(err){
                res.status(500).send(err.message);
            } else {
                var friends = new friendModel();
                friends.to_user_id = req.body.to_user_id;
                friends.from_user_id = req.body.from_user_id;
                friends.sent = Date.now();
                friends.accepted = false;
                friends.save(function(err){
                    res.json(friends);
                });
            }
        });
    },
    getFriends: function(req,res,next){
        friends.find({$or: [{from_user_id: req.params.id},{to_user_id: req.params.id}]}).exec(function(err,docs){
            res.json(docs)
        });
    }
}
