const router = require('express').Router();
const insertUser = require('../service/insertUser');
const adminGuard = require('../middleware/adminGuard');
const registerValidator = require('../validations/register');


router.post('/register', adminGuard, async (req, res) => {
    const { email, password, role, status } = req.body;

    const { error } = registerValidator({ email, password, role, status });

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = await insertUser({ email, password, role, status });

    if(user){
        return res.status(201).send(user);
    }

    return res.status(500).send('Error registering user, maybe the email is already in use');
})


module.exports = router;