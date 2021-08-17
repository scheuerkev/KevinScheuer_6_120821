const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(()=> res.status(200).json({ message: 'A new user was created in database' }))
            .catch(()=> res.status(404).json({ message: 'Unable to create user in database'}));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
User.findOne({ email: req.body.email })
    .then(user =>{
        if(!user) {
            return res.status(404).json({ message: 'Unable to find an user with this email'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if(!valid) {
                    return res.status(401).json({ message: 'This password is incorrect'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: 'TOKEN'
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};