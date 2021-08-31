//auth middleware requirements
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Try catch bloc to grant request by JWT. Middleware split and verify token provided by user. If it fails, a 403 is catch
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'Unauthorized request';
        } else {
            next();
        }
    }catch (error){
        return res.status(403).json({ error: error | 'Unauthorized request'});
    }
}