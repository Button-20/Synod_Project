const mongoose = require('mongoose');
var  { Attendance } = require('../models/attendance.model');
var ObjectId = require('mongoose').Types.ObjectId;

// Registering Member Attendance
module.exports.register = (req, res, next) => {
    var attendance = new Attendance({
        classname: req.body.classname,
        participant: req.body.participant,
        temperature: req.body.temperature,
        date: req.body.date
    });
    if (req.body.classname == null || req.body.classname == "" || req.body.participant == null || req.body.participant == "" || req.body.temperature == null || req.body.temperature == ""){
        res.status(422).send(['Ensure all fields were provided.']);
    }else{
            attendance.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate Date found.']);
                    else
                        return next(err);
                }

            });
    }
}

// Getting all attendance array
module.exports.get = (req, res) => {
    Attendance.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving Attendance :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all attendance count
module.exports.getAllCount = (req, res) => {
    Attendance.countDocuments({}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Attendance Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all attendance count with classname
module.exports.getCount = (req, res) => {
    Attendance.countDocuments({classname: req.params.classname}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Attendance Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Filter by date
module.exports.getAllAttendanceDateFilter = (req, res) => {
    Attendance.find({date: {$gte: req.params.startdate, $lte: req.params.enddate}}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Attendance with Date :' + JSON.stringify(err, undefined, 2))};
    });

}


// Finding an attendance with ID
module.exports.getID = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Attendance found with given id : ${req.params.id}`);

        Attendance.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Attendance :' + JSON.stringify(err, undefined, 2))};
        });
}

// Finding an attendance with Classname
module.exports.getClassname = (req, res) => {
        Attendance.find({classname: req.params.classname}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Attendance with Classname :' + JSON.stringify(err, undefined, 2))};
        });
}


// Updating a attendance with ID
module.exports.put = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Attendance found with given id : ${req.params.id}`);
        
        var attendance = {
            classname: req.body.classname,
            participant: req.body.participant,
            temperature: req.body.temperature,
        };
        
        Attendance.findByIdAndUpdate(req.params.id, {$set: attendance}, {new: true}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Attendance Update :' + JSON.stringify(err, undefined, 2))}; 
        });
}


// Deleting a attendance with ID
module.exports.delete = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No Attendance found with given id : ${req.params.id}`);
        
       Attendance.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Attendance :' + JSON.stringify(err, undefined, 2))};
        });
}