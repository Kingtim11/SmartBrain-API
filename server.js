require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image.js');

//Connection details to Render database with knex.
const db = knex({
    client: 'pg',
    connection: {
      host : process.env.HOST,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DB,
      port: process.env.PORT,
      ss1: true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

 app.get('/', (req,res) => { res.send(`It's working!`) })
 app.post('/signin', signIn.handleSignIn(db, bcrypt) )
 app.post('/register', register.handleRegister(db, bcrypt, saltRounds))
 app.get('/profile/:id', profile.handleProfile(db))
 app.put('/image', image.handleImage(db))
 app.post('/imageUrl', (req, res) =>  { image.handlePatCall(req, res) })
 
 app.listen(process.env.PORT || 8080, () => {
    console.log(`App is running on port ${process.env.PORT}`)
 })