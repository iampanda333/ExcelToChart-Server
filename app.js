const express = require('express');
const fileOperationsRoutes = require('./routes/fileOperations');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT;

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileOperationsRoutes);

module.exports = app;
