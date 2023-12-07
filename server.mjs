import express from 'express';
import bodyParser from 'body-parser';
import { hash, compare } from 'bcrypt';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { signin, signup } from './db/db.mjs';
import secret from './client_secret.json' assert {type: 'json'};
import fetch from 'node-fetch';
import querystring from 'querystring';
import secret2 from './secret.json' assert {type: 'json'};

const { urlencoded } = bodyParser;
const app = express();

const CLIENT_ID2 = secret2.client_id;
const CLIENT_SECRET2 = secret2.client_secret;

const CLIENT_ID = secret.client_id;
const CLIENT_SECRET = secret.client_secret;
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/auth/google/callback';
const GITHUB_REDIRECT_URI = 'http://localhost:3000/auth/github/callback';

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

// Google OAuth2
app.get('/auth/google', (req, res) => {
  
  const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    access_type: 'online'
  };
  res.redirect(`${authorizationUrl}?${querystring.stringify(params)}`);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Code not found');
  }
  try {
    
    const tokenParams = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
      code,
    };
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify(tokenParams),
    });
    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token');
    }
    const tokenData = await tokenResponse.json();
   
    const { access_token } = tokenData;
   
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!userInfoResponse.ok) {
      throw new Error('Failed to fetch user information');
    }
    const userInfo = await userInfoResponse.json();
    
    console.log('Google user Info:', userInfo);
    
    res.send('Google authentication successful');
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(500).send('Failed to authenticate via Google');
  }});
  
// GitHub OAuth2
app.get('/auth/github', (req, res) => {
  const authorizationUrl = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: CLIENT_ID2,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: 'read:user',
  };
  res.redirect(`${authorizationUrl}?${querystring.stringify(params)}`);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Code not found');
  }

  try {
    
    const tokenParams = {
      client_id: CLIENT_ID2,
      client_secret: CLIENT_SECRET2,
      code,
    };

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(tokenParams),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token');
    }

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    
    const userInfoResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to fetch user information');
    }

    const userInfo = await userInfoResponse.json();
    
    console.log('GitHub User Info:', userInfo);
    
    
    res.send('GitHub authentication successful');
  } catch (error) {
    console.error('Error during GitHub authentication:', error);
    res.status(500).send('Failed to authenticate via GitHub');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});