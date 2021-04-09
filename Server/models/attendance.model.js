const mongoose = require('mongoose');

var Attendance = mongoose.model('Attendance', {
    participant: {
        type: String,
        required: 'Member Name can\'t be empty',
        ref: 'Member'
    },
    temperature: {
        type: Number,
        required: 'Temperature can\'t be empty',
    },
    date: {
        type: Date,
        required: 'Date can\'t be empty'
    },
    created:{
        type: Date,
        default: Date.now()
    }

});

module.exports = { Attendance };