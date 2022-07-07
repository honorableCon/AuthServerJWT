require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/auth', authRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));