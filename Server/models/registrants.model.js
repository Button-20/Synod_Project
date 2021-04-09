const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Registrant = mongoose.model('Registrant', {
    title: {
        type: String,
        required: 'Title can\'t be empty'
    },
    firstname: {
        type: String,
        required: 'First Name can\'t be empty'
    },
    othername: {
        type: String
    },
    lastname: {
        type: String,
        required: 'Last Name can\'t be empty'
    },
    dateofbirth: {
        type: String,
        required: 'Date Of Birth can\'t be empty'
    },

    phonenumber: {
        type: String,
        required: 'Phone Number can\'t be empty',
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    position: {
        type: String,
        required: 'Position can\'t be empty',
    },

    circuit: {
        type: String,
        required: 'Circuit can\'t be empty',
    },

    category: {
        type: String,
        required: 'Category can\'t be empty',
    },
    circuitorganisation: {
        type: String
    },

    medicalconditon: {
        type: String
        
    },
    created:{
        type: Date,
        default: Date.now()
    },
    saltSecret: String
});


module.exports = { Registrant };