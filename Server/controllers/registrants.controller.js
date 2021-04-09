const mongoose = require('mongoose');
const passport = require('passport');
var ObjectId = require('mongoose').Types.ObjectId;
var  { Registrant } = require('../models/registrants.model');
const uniqueRandomRange = require("unique-random-range");
let rand = uniqueRandomRange(1, 1000);
var unirest = require('unirest');

module.exports.register = (req, res, next) => {
    var randomID = 'ADMCG' + rand();
    var registrant = new Registrant({
        title: req.body.title,
        firstname: req.body.firstname,
        othername: req.body.othername,
        lastname: req.body.lastname,
        email: req.body.email,
        dateofbirth: req.body.dateofbirth,
        phonenumber: req.body.phonenumber,
        position: req.body.position,
        circuit: req.body.circuit,
        category: req.body.category,
        circuitorganisation: req.body.circuitorganisation,
        regId: randomID
    })
    
    if (
    req.body.title == null || req.body.title == "" ||
    req.body.firstname == null || req.body.firstname == "" ||
    req.body.lastname == null || req.body.lastname == "" ||
    req.body.phonenumber == null || req.body.phonenumber == "" ||
    req.body.email == null || req.body.email == "" ||
    req.body.dateofbirth == null || req.body.dateofbirth == "" ||
    req.body.position == null || req.body.position == "" || 
    req.body.circuit == null || req.body.circuit == ""
    || req.body.category == null || req.body.category == "")
    {
        res.status(422).send(['Ensure all fields were provided.']);
    }
    else{
        var req = unirest('GET', `https://deywuro.com/api/sms?username=Billme&password=billme123&source=Synod2021&destination=${registrant.phonenumber}&message=Dear ${registrant.firstname + ' ' + registrant.lastname} your synod2021 online registration is successful . Your registration Id is ${randomID}`)
            .end(function (res) { 
                if (res.error) throw new Error(res.error); 
                console.log(res.raw_body);
         });

            registrant.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate email address found.']);
                    else
                        return next(err);
                }

            });
    }
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, Registrant, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered Registrant
        else if (Registrant) return res.status(200).json({ "token": Registrant.generateJwt() });
        // unknown Registrant or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// Getting all members array
module.exports.get = (req, res) => {
    Registrant.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving Registrants :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all members array
module.exports.getAllCount = (req, res) => {
    Registrant.countDocuments({}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Members Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all Registrant array with specific position
module.exports.getPositionMinisterCount = (req, res) => {
    Registrant.countDocuments({position: 'Minister'}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Ministers Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all Registrants array with specific classnmae
module.exports.getPositionLayCount = (req, res) => {
    Registrant.countDocuments({position: 'Lay'}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Lay Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all Registrants array with specific classnmae
module.exports.getPositionVisitorsCount = (req, res) => {
    Registrant.countDocuments({position: 'Visitor'}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Visitors Count :' + JSON.stringify(err, undefined, 2))}
    });
}



// Finding a member with ID
module.exports.getID = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No member found with given id : ${req.params.id}`);

        Registrant.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Member :' + JSON.stringify(err, undefined, 2))};
        });
}

// Updating a member with ID
module.exports.put = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No member found with given id : ${req.params.id}`);
        
        var Registrant = {
            title: req.body.title,
            firstname: req.body.firstname,
            othername: req.body.othername,
            lastname: req.body.lastname,
            dateofbirth: req.body.dateofbirth,
            phonenumber: req.body.phonenumber,
            position: req.body.position,
            circuit: req.body.circuit,
            category: req.body.category,
            circuitorganisation: req.body.circuitorganisation,
        
        }

        Registrant.findByIdAndUpdate(req.params.id, {$set: Registrant}, {new: true}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Member Update :' + JSON.stringify(err, undefined, 2))}; 
        });
}

// // Updating a member login permission with ID
// module.exports.putLoginPermission = (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No member found with given id : ${req.params.id}`);
        
//         var Registrant = {
//             loginPermission: req.body.loginPermission
//         }

//         Registrant.findByIdAndUpdate(req.params.id, {$set: Registrant}, {new: true}, (err, doc) => {
//             if (!err) { res.send(doc); }
//             else { console.log('Error in Member Update :' + JSON.stringify(err, undefined, 2))}; 
//         });
// }


// Deleting a member with ID
module.exports.delete = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No member found with given id : ${req.params.id}`);
        
       Registrant.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Registrant :' + JSON.stringify(err, undefined, 2))};
        });
}
