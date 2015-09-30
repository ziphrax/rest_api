var participantModel = require('./../models/participant');

module.exports = {
    getParticipants: function(req,res){
        participantModel.find({}).sort('-date').exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newParticipant: function(req,res){
        var newParticipant = new participantModel();

        for(eachkey in req.body){
            newParticipant[eachkey] = req.body[eachkey];
        }

        newParticipant.name = req.body.name;
        newParticipant.owner = req.decoded._id;

        newParticipant.save(function(){
            res.json({'success': true, data: [newParticipant] });
        });
    },
    getParticipant: function(req,res){
        participantModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateParticipant: function(req,res){
        participantModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {
                    for(eachkey in req.body){
                        doc[eachkey] = req.body[eachkey]?req.body[eachkey]:doc[eachkey];
                    }

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
    deleteParticipant: function(req,res){
        participantModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {
                    doc.remove(function(err){
                        res.status(200).json({'success': true, 'message': 'Participant Deleted' });
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
