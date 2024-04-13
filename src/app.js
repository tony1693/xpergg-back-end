const express = require('express');

const cors = require('cors');

const app = express();

const pageRouter = require('./router/xpergg.router');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

// app.use(pageRouter);

app.set('port', 2000);

module.exports = app;
