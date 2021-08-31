//Requirements for User schema
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Mongoose User schema
const userSchema = mongoose.Schema({
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    });

//adding Mongoose unique Validator to prevent email duplicity
userSchema.plugin(uniqueValidator);

//Exporting schema
module.exports = mongoose.model('User', userSchema);