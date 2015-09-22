var friendModel = require('./../models/friend');
var config = require('./../config');
var email   = require("emailjs");

var smtpServer = email.server.connect({
    user: config.smtpUser,
    password: config.smtpPassword,
    host: config.smtpHost,
    ssl: config.smtpSSLEnabled
});

module.exports = {
    makeFriends: function(req,res,next){
        smtpServer.send({
            text: req.body.text,
            from: req.body.from,
            to: req.body.to,
            cc: req.body.cc,
            subject: req.body.subject
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
