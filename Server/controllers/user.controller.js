const mongoose = require('mongoose');
const passport = require('passport');
var ObjectId = require('mongoose').Types.ObjectId;
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.classname = req.body.classname;
    user.title = req.body.title;
    user.firstname = req.body.firstname;
    user.othername = req.body.othername;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.dateofbirth = req.body.dateofbirth;
    user.phonenumber = req.body.phonenumber;
    user.position = req.body.position;
    user.circuit = req.body.circuit;
    user.category = req.body.category;
    user.circuitorganisation = req.body.circuitorganisation;
    user.loginPermission = req.body.loginPermission;
    
    if (req.body.classname == null || req.body.classname == "" ||
    req.body.title == null || req.body.title == "" ||
    req.body.firstname == null || req.body.firstname == "" ||
    req.body.lastname == null || req.body.lastname == "" ||
    req.body.password == null || req.body.password == "" ||
    req.body.phonenumber == null || req.body.phonenumber == "" ||
    req.body.email == null || req.body.email == "" ||
    // req.body.dateofbirth == null || req.body.dateofbirth == "" ||
    req.body.position == null || req.body.position == "" || 
    req.body.circuit == null || req.body.circuit == ""
    || req.body.circuitorganisation == null || req.body.circuitorganisation == "" || req.body.category == null || req.body.category == "")
    {
        res.status(422).send(['Ensure all fields were provided.']);
    }
    else{
            user.save((err, doc) => {
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
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// Getting all members array
module.exports.get = (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving Users :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all members array
module.exports.getAllCount = (req, res) => {
    User.countDocuments({}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Members Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all user array with specific position
module.exports.getPositionMinisterCount = (req, res) => {
    User.countDocuments({position: 'Minister'}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Ministers Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all users array with specific classnmae
module.exports.getPositionLayCount = (req, res) => {
    User.countDocuments({position: 'Lay'}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Lay Count :' + JSON.stringify(err, undefined, 2))}
    });
}

// Getting all users array with specific classnmae
module.exports.getPositionVisitorsCount = (req, res) => {
    User.countDocuments({position: 'Visitor'}, (err, docs) => {
        if (!err) { res.json(docs); }
        else { console.log('Error in retrieving Visitors Count :' + JSON.stringify(err, undefined, 2))}
    });
}



// Finding a member with ID
module.exports.getID = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No member found with given id : ${req.params.id}`);

        User.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Member :' + JSON.stringify(err, undefined, 2))};
        });
}

// Updating a member with ID
module.exports.put = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No member found with given id : ${req.params.id}`);
        
        var user = {
            classname: req.body.classname,
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
            loginPermission: req.body.loginPermission
        
        }

        User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Member Update :' + JSON.stringify(err, undefined, 2))}; 
        });
}

// // Updating a member login permission with ID
// module.exports.putLoginPermission = (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No member found with given id : ${req.params.id}`);
        
//         var user = {
//             loginPermission: req.body.loginPermission
//         }

//         User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true}, (err, doc) => {
//             if (!err) { res.send(doc); }
//             else { console.log('Error in Member Update :' + JSON.stringify(err, undefined, 2))}; 
//         });
// }


// Deleting a member with ID
module.exports.delete = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No member found with given id : ${req.params.id}`);
        
       User.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retrieving Member :' + JSON.stringify(err, undefined, 2))};
        });
}
