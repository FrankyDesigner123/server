const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denied.');

    // verify token
    try{ 
        const verified = jwt.verify(token, 'MY_SECRET_KEY')
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token..')
    }

}