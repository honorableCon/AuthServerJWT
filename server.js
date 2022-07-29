require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const port = process.env.PORT || 5000;
const allowCrossDomain = process.env.ALLOW_CROSS_DOMAIN;

app.use(cors({
    origin: allowCrossDomain, optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the AuthServerJWT'});
});


app.listen(port, () => console.log(`Listening on port ${port}`));