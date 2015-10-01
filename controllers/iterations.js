var iterationModel = require('./../models/iteration');

module.exports = {
    getIterations: function(req,res){
        iterationModel.find({}).sort('-date').exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newIteration: function(req,res){
        var newIteration = new iterationModel();

        for(eachkey in req.body){
            newIteration[eachkey] = req.body[eachkey];
        }

        newIteration.name = req.body.name;
        newIteration.owner = req.decoded._id;

        newIteration.save(function(){
            res.json({'success': true, data: [newIteration] });
        });
    },
    getIteration: function(req,res){
        iterationModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateIteration: function(req,res){
        iterationModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id  || req.decoded.name == 'Administrator') {
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
    deleteIteration: function(req,res){
        iterationModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id  || req.decoded.name == 'Administrator') {
                    doc.remove(function(err){
                        res.status(200).json({'success': true, 'message': 'Iteration Deleted' });
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
