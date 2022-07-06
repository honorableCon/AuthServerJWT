require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_ADMIN_URI;

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/auth', authRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));