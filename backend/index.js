const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectToDatabase } = require('./db');
const todoRoutes = require('./routes/todoRoutes');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();
const PORT = process.env.PORT || 8000;

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
