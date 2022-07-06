const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_ADMIN_URI;

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/auth', authRouter);




app.listen(port, () => console.log(`Listening on port ${port}`));