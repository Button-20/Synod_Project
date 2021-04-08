const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    classname: {
        type: String,
        required: 'Class Name can\'t be empty'
    },
    title: {
        type: String,
        required: 'Title can\'t be empty'
    },
    firstname: {
        type: String,
        required: 'First Name can\'t be empty'
    },
    othername: {
        type: String,
        required: 'Other Name can\'t be empty'
    },
    lastname: {
        type: String,
        required: 'Last Name can\'t be empty'
    },
    dateofbirth: {
        type: String
        // required: 'Date Of Birth can\'t be empty'
    },
    phonenumber: {
        type: String,
        required: 'Phone Number can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
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
        type: String,
        required: 'Circuit Organisation can\'t be empty',
    },
    medicalconditon: {
        type: String,
    },
    role: {
        type: String,
        default: "User",
    },
    pic: {
        type: String,
        default: "assets/img/default-avatar.png"
    },
    loginPermission: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be at least 4 character long']
    },

    created:{
        type: Date,
        default: Date.now()
    },
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id, role: this.role, classname: this.classname, pic: this.pic, loginPermission: this.loginPermission},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}


mongoose.model('User', userSchema);