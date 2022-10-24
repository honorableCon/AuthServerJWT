const router = require('express').Router();
const insertUser = require('../service/insertUser');
const findEmail = require('../service/findEmail');
const updateField = require('../service/updateField');
const adminGuard = require('../middleware/adminGuard');
const registerValidator = require('../validations/register');


router.post('/register', adminGuard, async (req, res) => {
    const { email, password, role, status } = req.body;

    const { error } = registerValidator({ email, password, role, status });

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const isExist = await findEmail(email);

    if (!isExist) {
        return res.status(400).json({ error: 'Admin account does not exist' });
    }

    const user = await insertUser({ email, password, role, status });

    if (user) {
        return res.status(201).send(user);
    }

    return res.status(500).send('Error registering user, maybe the email is already in use');
})

/*
* Only Admin are allowed to remove their session using this server endpoint
*/
router.patch("/logout", adminGuard, async (req, res) => {
    const isAdmin = req.body.token;
    const isExist = await findEmail(isAdmin.email);

    if (!isExist) {
        return res.status(400).json({ error: 'Admin account does not exist' });
    }
    const updatedUser = await updateField({ email: isAdmin.email, status: 'inactive' });
    return res.status(200).send("Logged Out");
});

router.post("/logout", adminGuard, async (req, res) => {
    const isAdmin = req.body.token;
    const isExist = await findEmail(isAdmin.email);

    if (!isExist) {
        return res.status(400).json({ error: 'Admin account does not exist' });
    }

    const isUserExist = await findEmail(req.body.email);

    if (!isUserExist) {
        return res.status(400).json({ error: 'User account does not exist' });

    } else if (isUserExist.role !== 'user') {
        return res.status(403).json({ error: 'Cannot remove Admin session' });

    } else {
        const updatedUser = await updateField({ email: isUserExist.email, status: 'inactive' });
        return res.status(200).send("Logged Out");
    }
});

module.exports = router;