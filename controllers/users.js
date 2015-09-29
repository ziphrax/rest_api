var userModel = require('./../models/user');

module.exports = {
    getUsers: function(req,res){
        userModel.find({},'name firstName lastName EmailAddress DateOfBirth status created address phone_tel phone_mob phone_work').exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newUser: function(req,res){
        var newUser = new userModel();

        newUser.name = req.body.name;
        newUser.password = req.body.password;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.EmailAddress = req.body.EmailAddress;
        newUser.DateOfBirth = req.body.DateOfBirth;
        newUser.status = 'New';
        newUser.created =  Date.now();
        newUser.address = req.body.address;
        newUser.phone_tel = req.body.phone_tel;
        newUser.phone_mob = req.body.phone_mob;
        newUser.phone_work = req.body.phone_work;

        newUser.save(function(){
            res.json({'success': true, data: [newUser] });
        });
    },
    getUser: function(req,res){
        userModel.findOne({_id:req.params.id},'name firstName lastName EmailAddress DateOfBirth status created address phone_tel phone_mob phone_work').exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateUser: function(req,res){
        userModel.findOne({_id:req.params.id},'name firstName lastName EmailAddress DateOfBirth status created address phone_tel phone_mob phone_work').exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                doc.firstName = req.body.firstName?req.body.firstName:doc.firstName;
                doc.lastName = req.body.lastName?req.body.lastName:doc.lastName;
                doc.EmailAddress = req.body.EmailAddress?req.body.EmailAddress:doc.EmailAddress;
                doc.DateOfBirth = req.body.DateOfBirth?req.body.DateOfBirth:doc.DateOfBirth;
                doc.status = req.body.status?req.body.status:doc.status;
                doc.updated =  Date.now();
                doc.address = req.body.address?req.body.address:doc.address;
                doc.phone_tel = req.body.phone_tel?req.body.phone_tel:doc.phone_tel;
                doc.phone_mob = req.body.phone_mob?req.body.phone_mob:doc.phone_mob;
                doc.phone_work = req.body.phone_work?req.body.phone_work:doc.phone_work;

                doc.save(function(){
                    res.json({'success': true, data: [doc] });
                });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    deleteUser: function(req,res){
        userModel.findOne({_id:req.params.id} ,'name firstName lastName EmailAddress DateOfBirth status created address phone_tel phone_mob phone_work').exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                doc.remove(function(err){
                    res.status(200).json({'success': true, 'message': 'User Deleted' });
                });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
}
