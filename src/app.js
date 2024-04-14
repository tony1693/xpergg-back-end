const express = require ('express')
const cors = require ('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const xperggRouters = require ('./routers/xpergg.routers')

const errorHandling = require('./xpergg-back/error/errorHandling')

const app = express();
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000)

app.use(cors());
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(xperggRouters);
app.use(function(req, res, next)
{
    res.status(404).json({  error:true,
                            codice: 404,
                             message:'endPoint doesn´t found'})
})

app.use(errorHandling);

module.exports = app;
