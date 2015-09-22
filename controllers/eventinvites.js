var eventInviteModel = require('./../models/eventinvite');
var config = require('./../config');
var email   = require("emailjs");

var smtpServer = email.server.connect({
    user: config.smtpUser,
    password: config.smtpPassword,
    host: config.smtpHost,
    ssl: config.smtpSSLEnabled
});

module.exports = {
    sendInvite: function(req,res,next){
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
                var invite = new eventInviteModel();
                invite.event_id = req.body.event_id;
                invite.user_id = req.body.user_id;
                invite.sent = Date.now();
                invite.save(function(err){
                    res.json(invite);
                });
            }
        });
    }
}
