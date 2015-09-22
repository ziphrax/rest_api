var userModel = require('./../models/user');

module.exports = {
    getUsers: function(req,res){
        userModel.find({}).exec(function(err,docs){
            if(err){
                res.status(500).send(err.message);
            } else {
                res.status(200).json(docs);
            }
        });
    },
    newUser: function(req,res){
        var newUser = new userModel();

        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.EmailAddress = req.body.EmailAddress;
        newUser.DateOfBirth = req.body.DateOfBirth;
    	newUser.status = req.body.status;
    	newUser.updated =  Date.now();
        newUser.address = req.body.address;
        newUser.phone_tel = req.body.phone_tel;
        newUser.phone_mob = req.body.phone_mob;
        newUser.phone_work = req.body.phone_work;

        newUser.save(function(){
            res.json([newUser]);
        });
    },
    getUser: function(req,res){
        userModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).send(err.message);
            } else if (doc) {
                res.json([doc]);
            } else {
                res.status(404).send('The requested resource does not exist');
            }
        });
    },
    updateUser: function(req,res){
        userModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).send(err.message);
            } else if (doc) {
                doc.firstName = req.body.firstName;
                doc.lastName = req.body.lastName;
                doc.EmailAddress = req.body.EmailAddress;
                doc.DateOfBirth = req.body.DateOfBirth;
                doc.status = 'New';
                doc.created =  Date.now();
                doc.address = req.body.address;
                doc.phone_tel = req.body.phone_tel;
                doc.phone_mob = req.body.phone_mob;
                doc.phone_work = req.body.phone_work;

                doc.save(function(){
                    res.json([newUser]);
                });
            } else {
                res.status(404).send('The requested resource does not exist');
            }
        });
    },
    deleteUser: function(req,res){
        userModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).send(err.message);
            } else if (doc) {
                doc.remove(function(err){
                    res.status(200).send('User Deleted');
                });
            } else {
                res.status(404).send('The requested resource does not exist');
            }
        });
    },
}
