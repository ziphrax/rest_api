var eventModel = require('./../models/event');

module.exports = {
    getEvents: function(req,res){
        eventModel.find({}).exec(function(err,docs){
            if(err){
                res.status(500).send(err.message);
            } else {
                res.status(200).json(docs);
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
            res.json([newEvent]);
        });
    },
    getEvent: function(req,res){
        eventModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).send(err.message);
            } else if (doc) {
                res.json([doc]);
            } else {
                res.status(404).send('The requested resource does not exist');
            }
        });
    },
    updateEvent: function(req,res){
        eventModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).send(err.message);
            } else if (doc) {
                doc.title = req.body.title;
                doc.content = req.body.content;
                doc.status = req.body.status;
                doc.status = req.body.status;
                doc.updated =  Date.now();
                doc.owner = req.body.owner;
                doc.longitude = req.body.longitude;
                doc.lattitude = req.body.lattitude;
                doc.address = req.body.address;

                doc.save(function(){
                    res.json([newEvent]);
                });
            } else {
                res.status(404).send('The requested resource does not exist');
            }
        });
    },
    deleteEvent: function(req,res){
        eventModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).send(err.message);
            } else if (doc) {
                doc.remove(function(err){
                    res.status(200).send('Event Deleted');
                });
            } else {
                res.status(404).send('The requested resource does not exist');
            }
        });
    },
}
