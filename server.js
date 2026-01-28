const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require('knex');
const RateLimit = require('express-rate-limit');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const index = require('./controllers/index')

// set up rate limiter: maximum of five requests per minute
const limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
      rejectUnauthorized: false
    }
  });

const app = express();
app.use(express.json())
app.use(cors());
app.use(limiter);

app.get('/', (req,res) => index.handleIndex(req,res));

app.post('/signin', (req,res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req,res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req,res) => profile.handleProfile(req, res, db));

app.post('/profile/:id', (req, res) => profile.handleProfileUpdate(req, res, db));

app.get('/scoreboard', (req,res) => profile.getScoreBoard(req, res, db));

app.post('/deleteprofile', (req, res) => profile.deleteProfile(req, res, db));

app.put('/image', (req,res) => image.handleImage(req, res, db));

app.post('/imageurl', (req,res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 2222, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})