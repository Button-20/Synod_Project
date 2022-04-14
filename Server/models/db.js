const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect('mongodb+srv://admin:sound.it@synod.yozbn.mongodb.net/SYNOD?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection: ' + JSON.stringify(err, undefined, 2)); }
=======
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
>>>>>>> fc88cec46f97d1863f4c718c87b713ceed9718ad
});

require('./user.model');