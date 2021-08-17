//DotEnv requirement
require('dotenv').config();

//OpenAPI 3.0 Specifications and requirements

const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const openAPIOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Piiquante API",
            version: "1.0.0",
            description: "Piiquante is a private Express RESTful API to provide HTTP services to Hot Takes web app"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./routes/*.js"],
};

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.js');

const openAPISpecs = swaggerJSDoc(openAPIOptions);
const app = express();
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('Data base connection ok...'))
    .catch(()=> console.log('Data base connection failure'));


app.use('/api/auth', userRoutes);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));

module.exports = app;