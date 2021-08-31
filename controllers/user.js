//Controller user requirements
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Dotenv requirement to load locals env variables
require('dotenv').config();

//emailMask is a Regexp pattern to test email validity
const emailMask = /^[a-z0-9-_]*[.]{0,1}[a-zA-Z0-9-_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,15}){1}$/;

//signup allows user to create a new account to use Hot Take, he has to provide unique email address and password once
exports.signup = (req, res, next) => {
    //first, test email pattern validity (e.g frontend doesn't test email suffixes)
    if (!(emailMask.test(req.body.email))) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            //if this email address already exists in db
            if (user) return res.status(409).json({ message: 'This user already exists' });
            //hash password
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'A new user was created in database' }))
                        .catch(error => res.status(404).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
};

//login controller looking for matching credentials in db and allow user to connect with existing account
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            //if user doesn't exist in db
            if (!user) return res.status(404).json({ message: 'Unable to find an user with this email' });

            //bcrypt compare
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //if password isn't correct
                    if (!valid) return res.status(401).json({ essage: 'This password is incorrect' });
                    //then, if all good : sign userId with JWT
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.TOKEN_KEY,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};