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
      host : 'postgres://db_k96m_user:V6RVh1slju0UIgKCRcMJKVXXrziVHmfZ@dpg-cfh3h8hgp3jqehpj23q0-a/db_k96m',
      user : 'db_k96m_user',
      password : 'V6RVh1slju0UIgKCRcMJKVXXrziVHmfZ',
      database : 'db_k96m'
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