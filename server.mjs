import express from 'express';
import bodyParser from 'body-parser';
import { hash , compare } from 'bcrypt';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {signin,signup } from './db/db.mjs';

const { urlencoded } = bodyParser;
const app = express();

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

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
