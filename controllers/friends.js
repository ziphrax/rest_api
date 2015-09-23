var friendModel = require('./../models/friend');
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
    makeFriends: function(req,res){
      transporter.sendMail({
        from: 'sender@address',
        to: 'receiver@address',
        subject: 'New Friends Request!',
        text: 'New Friends Request.'
      },function(err,message){
          if(err && node_env != "development"){
              res.status(500).json({'success': false, data: err });
          } else {
              var friends = new friendModel();
              friends.to_user_id = req.body.to_user_id;
              friends.from_user_id = req.body.from_user_id;
              friends.sent = Date.now();
              friends.accepted = false;
              friends.save(function(err){
                  res.json({'success': true, data: [friends] });
              });
          }
        });
    },
    getFriends: function(req,res){
        friendModel.find({$or: [{from_user_id: req.params.id},{to_user_id: req.params.id}]}).exec(function(err,docs){
            res.json({'success': true, data: [docs] });
        });
    }
}
