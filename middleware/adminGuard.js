const jwt = require('jsonwebtoken');
const router = require('express').Router();


router.use('/', async (req, res, next) => {
    const publicKey = process.env.JWT_RSA_PUBLIC_KEY;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, publicKey);
    
    const isAdmin = decoded.role === 'admin';
    const isActive = decoded.status === 'active';

    if(!isAdmin || !isActive){
        return res.status(401).send('Unauthorized');
    }

    next();
})


module.exports = router;