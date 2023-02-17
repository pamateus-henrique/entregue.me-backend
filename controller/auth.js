const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');


const login = async (req,res) => {

    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide all values');
    }

    const user = await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError('this user does not exists')
    }

    const isCorrectPassword = user.comparePassword(password);

    if(!isCorrectPassword){
        throw new UnauthenticatedError('incorrect password');
    }

    res.status(StatusCodes.OK).json({token: user.generateToken()});

}

const register = async (req,res) => {
    
    if(!req.body.email || !req.body.password || !req.body.name){
        throw new BadRequestError('Please provide all values');
    }

    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({name: user.name, token: user.generateToken()});
}

module.exports = {login,register}