const User = require('../Model/user_model');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

//
const JWT_SECRET = process.env.JWT_SECRET;



// controllers

const signUp = ((req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password){
        return res.json({
            error: true,
            message: 'Fill all required fields'
        });
    }
    
    if (!validator.isEmail(req.body.email)){
        return res.json({
            error: true,
            message: 'Invalid email address'
        });
    }
    let email = req.body.email;
    User.findOne({email})
        .then((result) => {
            if (result){
                res.json({
                    error: true,
                    message: 'A user with same email exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hpass) => {
                    if (err){
                        res.json({
                            error: true,
                            message: err.message
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            username: req.body.username,
                            email: req.body.email,
                            password: hpass
                        })
                        user.save()
                            .then((user) => {
                                res.json({
                                    error: false,
                                    message: 'User created!'
                                })
                            })
                            .catch((err) => {
                                console.log(err.message);
                                res.json({
                                    error: true,
                                    message: err.message
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.json({
                error: true,
                message: err.message
            });
        });
});



const signIn = ((req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!validator.isEmail(email)){
        return res.json({
            error: true,
            message: 'Invalid email'
        });
    }
    User.findOne({email})
        .then((user) => {
            if (!user){
                return res.json({
                    error: true,
                    message: 'User with email does not exist'
                });
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err){
                        return res.json({
                            error: true,
                            message: 'Authenticatication failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userID: user._id
                        }, JWT_SECRET, {
                            expiresIn: "2h"
                        });
                        console.log(token);

                        return res.status(200).cookie('auth',token).json({
                            error: false,
                            userId: user._id,
                            message: 'You logged in successfully!',
                            token: token

                        });
                    }
                    else{
                        return res.json({
                            error: true,
                            message: 'Incorrect password'
                        })
                    }
                })
            }
        })
        .catch((err) => {
            console.log('Error occured');
            res.json({
                error: true,
                message: err.message
            });
        });
});



module.exports = {
    signUp,
    signIn
}