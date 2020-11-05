//Setting up express
const express = require('express');
const mongoose = require('mongoose');

// init express app
const app = express();

// body of the req
app.use(express.json());

// import router
const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
    res.send('Welcome to the auth system');
});

app.get('/api/user/profile', verifyToken, (req, res) => {
    res.send({success: true, data: req.user});
});

app.use('/api/users', authRoutes);

// this returns a promise
mongoose.connect('mongodb+srv://master_admin:8HzshVwrknlW0OpG@login-demo.tibwo.mongodb.net/auth_system?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        // define the port
        app.listen(3000, () => console.log('server is running'));
    })
    .catch(err => console.log(err))

