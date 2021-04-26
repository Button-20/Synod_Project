const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:sound.it@egroups.oc91c.mongodb.net/Egroups?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
// process.env.MONGODB_URI