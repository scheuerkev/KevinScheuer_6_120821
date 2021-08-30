const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const emailMask = /^[a-z0-9-_]*[.]{0,1}[a-zA-Z0-9-_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,15}){1}$/;

exports.signup = (req, res, next) => {

    if (!(emailMask.test(req.body.email))) {
        return res.status(400).json({message: 'Please provide a valid email address'});
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) return res.status(409).json({message: 'This user already exists'});
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({message: 'A new user was created in database'}))
                        .catch(err => res.status(404).json({message: err}));
                })
                .catch(error => res.status(500).json({error}));
        })
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'Unable to find an user with this email'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'This password is incorrect'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.TOKEN_KEY,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};