const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:sound.it@synod.yozbn.mongodb.net/SYNOD?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection: ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');