const routes = require('express').Router();
const error = require('../helpers/error');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('users');
const { emailValidation } = require('../helpers/validate');
const passport = require('passport');
require('../helpers/passport');
const jwt = require('jsonwebtoken');

//Get user details
routes.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    });
});

//create a user or Signup
routes.post('/create', async (req, res) => {
    const { fullname, password, username, email } = req.body;

    //@params are required
    if(!fullname || !password || !username || !email || !emailValidation(email)){
        return res.status(400).send(error(false, 'Parameters missing'));
    }
 
    try{
        //Create new user
        const user = new User({
            fullname,
            username,
            email,
            password
        });

        //Save user
        await user.save();

        //send the response
        res.status(200).send({
            success: true,
            data: user,
            message: 'User created successfully'
        });

    }catch(e){
        return res.status(500).send(error(false, 'Something went wrong while saving the data', e)); 
    }

});

//Login
routes.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user){
                const error = new Error('An error occured');
                return next(error);
            }

            req.login(user, {session: false}, async (error) => {
                if(error) return next(error);
        
                const body = {_id: user._id, email: user.email};
        
                const token = jwt.sign({user: body}, 'top_secret');
        
                return res.json({token});
            });
        }catch(error) {

            return next(error);

        }
    })(req, res, next);
  
});


module.exports = routes;