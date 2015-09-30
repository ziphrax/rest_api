var programmeModel = require('./../models/programme');

module.exports = {
    getProgrammes: function(req,res){
        programmeModel.find({}).sort('-date').exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newProgramme: function(req,res){
        var newProgramme = new programmeModel();

        for(eachkey in req.body){
            newProgramme[eachkey] = req.body[eachkey];
        }

        newProgramme.name = req.body.name;
        newProgramme.owner = req.decoded._id;

        newProgramme.save(function(){
            res.json({'success': true, data: [newProgramme] });
        });
    },
    getProgramme: function(req,res){
        programmeModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateProgramme: function(req,res){
        programmeModel.findOne({_id:req.params.id}).exec(function(err,doc){
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
    deleteProgramme: function(req,res){
        programmeModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {
                    doc.remove(function(err){
                        res.status(200).json({'success': true, 'message': 'Programme Deleted' });
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
