import express from 'express';
import bodyParser from 'body-parser';
import { hash , compare } from 'bcrypt';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {signin,signup } from './db/db.mjs';
import secret from './client_secret.json' assert {type : 'json'} ;
import fetch from 'node-fetch';
import querystring from 'querystring' ;  

const { urlencoded } = bodyParser;
const app = express();

const CLIENT_ID = secret.client_id
const CLIENT_SECRET = secret.client_secret
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Registration endpoint
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = { username, password: hashedPassword };

    signup(username, user);

    res.send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering new user');
  }
});

// Login endpoint




app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let user = signin(username);
  if (!user) {
    return res.status(400).send('Invalid credentials');
  }
  const match = await compare(password, user.password);
  if (match) {
    res.send('Login successful');
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// Move Google authentication routes outside of the /login route
app.get('/auth/google', (req, res) => {
  const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    access_type: 'online'
  };
  res.redirect(`${authorizationUrl}?${querystring.stringify(params)}`);
});

app.get('/auth/google/callback', async (req, res) => {
  // ... (Your existing Google authentication code)
});

// ... (Your existing signup route)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
