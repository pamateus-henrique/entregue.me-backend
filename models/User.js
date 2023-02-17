const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
        minlength: 8
    }
});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.generateToken = function(){
    return jwt.sign({email: this.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(this.password, candidatePassword);
}

module.exports = mongoose.model('User', UserSchema);