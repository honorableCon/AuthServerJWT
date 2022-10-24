const router = require('express').Router();
const decodeToken = require('../service/decodeToken');

router.use('/', async (req, res, next) => {
    const decoded = await decodeToken(req);
    if (!decoded.status) {
        return res.status(500).json({ error: decoded.error });
    }

    const isUser = decoded.data.role === 'user';
    const isActive = decoded.data.status === 'active';

    if (!isUser) {
        return res.status(401).send('Unauthorized');
    }
    if (!isActive) {
        return res.status(200).send('Logged Out');
    }
    
    req.body = { ...req.body, token: decoded.data };
    next();
})

module.exports = router;