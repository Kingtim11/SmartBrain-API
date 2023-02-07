const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cfh3rs1gp3jqehpkhqlg-a.frankfurt-postgres.render.com',
      user : 'smartbrain_database_xbcx_user',
      password : 'YHRzfBZVEhbNzPmy2xxCx22PhRaO0LWT',
      database : 'smartbrain_database_xbcx'
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
 
 app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
 })