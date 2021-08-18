const passwordValidator = require('../models/Password.js');

module.exports = (req, res, next) => {
    try {
        if (!(passwordValidator.validate(req.body.password))) {
        throw 'Password security isn\'t respected';
        } else {
            next();
        }
    } catch {
        return res.status(422).json({ message: 'Password security isn\'t respected'});
    }

}