var clientModel = require('./../models/client');

module.exports = {
    getClients: function(req,res){
        clientModel.find({}).sort('-date').exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newClient: function(req,res){
        var newClient = new clientModel();

        for(eachkey in req.body){
            newClient[eachkey] = req.body[eachkey];
        }

        newClient.name = req.body.name;
        newClient.owner = req.decoded._id;

        newClient.save(function(){
            res.json({'success': true, data: [newClient] });
        });
    },
    getClient: function(req,res){
        clientModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateClient: function(req,res){
        clientModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {

                    for(eachkey in req.body){
                        doc[eachkey] = req.body[eachkey]?req.body[eachkey]:doc.[eachkey];
                    }
                    
                    doc.name = req.body.name?req.body.name:doc.name;

                    doc.save(function(){
                        res.json({'success': true, data: [doc] });
                    });
                } else {
                    res.status(401).json({ success: false, message: 'Authentication failed.' });
                }
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    deleteClient: function(req,res){
        clientModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {
                    doc.remove(function(err){
                        res.status(200).json({'success': true, 'message': 'Client Deleted' });
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
