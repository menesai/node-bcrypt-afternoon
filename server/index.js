require('dotenv').config();
const express = require('express');
const session = require('express-session')
const {json} = require('body-parser');
const massive = require('massive');
const {register, login, logout} = require('./controller/authController');
const {dragonTreasure, getUserTreasure, addUserTreasure, getAllTreasure} = require('./controller/treasureController');
const auth = require('./middleware/authMiddleware');

const app = express();
app.use(json());

massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('connected to the database')
})

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
)


///auth controller
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/logout', logout);

//auth treasure controller
app.get('/api/treasure', dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, getAllTreasure)

const port = 4000;
app.listen(port, () => {console.log(`Listening on port ${port}`)})