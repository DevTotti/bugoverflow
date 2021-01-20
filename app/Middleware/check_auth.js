const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    console.log(req.body.token);
    try {
        const decoded = jwt.verify(req.body.token, JWT_SECRET);
        req.userDecoded = decoded;
        req.email = decoded.email;
        next();
    }
    catch(error){
        console.log('Auth failed');
        res.json({
            error: true,
            message: 'Auth failed!'
        })
    }
}