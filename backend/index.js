const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const { connectToDatabase } = require('./db');
const todoRoutes = require('./routes/todoRoutes');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to generate nonce and set security headers
app.use((req, res, next) => {
  res.locals.nonce = Buffer.from(Date.now().toString()).toString('base64'); // Generate a base64 nonce
  next();
});

// Use helmet to set various security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, 'https://fonts.googleapis.com'],
        connectSrc: ["'self'", 'https://dev-z5txzw3n.us.auth0.com', 'http://localhost:8000'],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com']
      },
    },
    frameguard: {
      action: 'deny'
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    }
  })
);

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

app.use('/api/todos', checkJwt, todoRoutes);

app.get('/test', (req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
