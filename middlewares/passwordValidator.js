const passwordValidator = require('../models/Password.js');

module.exports = (req, res, next) => {
    try {
        if (!(passwordValidator.validate(req.body.password))) {
        throw new Error();
        } else {
            next();
        }
    } catch {
        return res.status(422).json({ message: 'Password security isn\'t respected (length must be between 8 and 100 chars, at least 2 digits and one uppercase and one lowercase)'});
    }

}