const mongoose = require('mongoose');

var Attendance = mongoose.model('Attendance', {
<<<<<<< HEAD
    participant: {
=======
    userid: {
        type: String,
        required: 'User ID can\'t be empty',
        ref: 'User'
    },
    classname: {
        type: String,
        required: 'Class Name can\'t be empty',
        ref: 'User'
    },
    membername: {
>>>>>>> fc88cec46f97d1863f4c718c87b713ceed9718ad
        type: String,
        required: 'Member Name can\'t be empty',
        ref: 'Member'
    },
<<<<<<< HEAD
=======
    date: {
        type: Date,
        required: 'Date can\'t be empty',
    },
>>>>>>> fc88cec46f97d1863f4c718c87b713ceed9718ad
    temperature: {
        type: Number,
        required: 'Temperature can\'t be empty',
    },
<<<<<<< HEAD
    date: {
        type: Date,
        required: 'Date can\'t be empty'
=======
    event: {
        type: String,
        required: 'Event can\'t be empty',
    },
    present: {
        type: Boolean,
        required: 'Present can\'t be empty',
>>>>>>> fc88cec46f97d1863f4c718c87b713ceed9718ad
    },
    created:{
        type: Date,
        default: Date.now()
    }

});

module.exports = { Attendance };