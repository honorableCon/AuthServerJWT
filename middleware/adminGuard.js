const router = require('express').Router();
const decodeToken = require('../service/decodeToken');

router.use('/', async (req, res, next) => {
    const decoded = await decodeToken(req);
    if (!decoded.status) {
        return res.status(500).json({ error: decoded.error });
    }

    const isAdmin = decoded.data.role === 'admin';
    const isActive = decoded.data.status === 'active';

    if (!isAdmin) {
        return res.status(401).send('Unauthorized');
    }
    if (!isActive) {
        return res.status(401).send('Logged Out');
    }

    req.body = { ...req.body, token: { email: decoded.data.email } };
    next();
})


module.exports = router;