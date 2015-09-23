var eventModel = require('./../models/event');

module.exports = {
    getEvents: function(req,res){
        eventModel.find({}).exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newEvent: function(req,res){
        var newEvent = new eventModel();

        newEvent.title = req.body.title;
        newEvent.content = req.body.content;
        newEvent.status = req.body.status;
    	  newEvent.created =  Date.now();
        newEvent.owner = req.body.owner;
        newEvent.longitude = req.body.longitude;
        newEvent.lattitude = req.body.lattitude;
        newEvent.address = req.body.address;

        newEvent.save(function(){
            res.json({'success': true, data: [newEvent] });
        });
    },
    getEvent: function(req,res){
        eventModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateEvent: function(req,res){
        eventModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                doc.title = req.body.title?req.body.title:doc.title;
                doc.content = req.body.content?req.body.content:doc.content;
                doc.status = req.body.status?req.body.status:doc.status;
                doc.updated =  Date.now();
                doc.owner = req.body.owner?req.body.owner:doc.owner;
                doc.longitude = req.body.longitude?req.body.longitude:doc.longitude;
                doc.lattitude = req.body.lattitude?req.body.lattitude:doc.lattitude;
                doc.address = req.body.address?req.body.address:doc.address;

                doc.save(function(){
                    res.json({'success': true, data: [doc] });
                });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    deleteEvent: function(req,res){
        eventModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                doc.remove(function(err){
                    res.status(200).json({'success': true, 'message': 'Event Deleted' });
                });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
}
