//Requirement for password schema
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

//Definition of constraints for creating password
passwordSchema
.is().min(8)                                                   //min 8 chars length
.is().max(100)                                                 //max 100 chars length
.has().uppercase()                                                  //at least one uppercase
.has().lowercase()                                                  //at least one lowercase
.has().digits(2)                                              //at least 2 digits
.has().not().spaces()                                               //white spaces not allowed
.is().not().oneOf(['Passw0rd', 'Password123', '123azertY']);    //this list exclude these patterns

//Exporting schema
module.exports = passwordSchema;