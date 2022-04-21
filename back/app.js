require('dotenv').config();

/*
const { Sequelize} = require('sequelize');
*/
const { sequelize, Post, User, Like} = require('./models');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


const app = express();
const bodyparser = require('body-parser');

const bcrypt = require("bcrypt");

const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


/*const sequelize = new Sequelize('groupomania', process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});*/

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect();
//sequelize.sync({}); // destructive sync

app.use(helmet({
        crossOriginResourcePolicy: {policy: "cross-origin"}
    }
));



app.use('/api', limiter);






app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyparser.json());


app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;