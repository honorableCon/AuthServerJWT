const router = require("express").Router();
const { options } = require("joi");
const createToken = require("../service/createToken");
const findUser = require("../service/findUser");
const findEmail = require("../service/findEmail");
const updateField = require("../service/updateField");
const userGuard = require("../middleware/userGuard");
const loginValidator = require("../validations/login");

router.post("/login", async (req, res) => {
  const optionsCookie = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  };
  const { email, password } = req.body;

  const { error } = loginValidator({ email, password });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await findUser({ email, password });

  if (user) {
    const { email, role, status } = user;
    const payload = { email, role, status };
    const token = await createToken(payload);
    return res.status(200).send({ token });
  }

  return res.status(400).json({ error: "Invalid email or password" });
});

/*
* User is allowed to remove users' session using this server endpoint
*/
router.patch("/logout", userGuard, async (req, res) => {
  const isUser = req.body.token;
  const isExist = await findEmail(isUser.email);

  if(!isExist){
      return res.status(400).json({ error: 'User account does not exist' });
  }
  const updatedUser = await updateField({ email: isExist.email, status: 'inactive' });
  return res.status(200).send("Logged Out");
});

module.exports = router;
