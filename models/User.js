//Requirements for User schema
const mongoose = require('mongoose');

//Mongoose User schema
const userSchema = mongoose.Schema({
        email: {type: String, required: true},
        password: {type: String, required: true}
    });

//Exporting schema
module.exports = mongoose.model('User', userSchema);