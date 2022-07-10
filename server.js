require('dotenv').config();
const express = require('express');
const app = express();
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the AuthServerJWT'});
});


app.listen(port, () => console.log(`Listening on port ${port}`));