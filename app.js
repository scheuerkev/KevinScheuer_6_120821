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
const openAPISpecs = swaggerJSDoc(openAPIOptions);

//Express rate-limit to constrain number of requests
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000, //15 minutes
    max: 100
});

//App requirements and security
const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const path = require('path');

//Importing routers
const userRoutes = require('./routes/user.js');
const sauceRoutes  = require('./routes/sauce.js');

//Launching app
const app = express();


//Mongoose DB connection
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('Data base connection ok...'))
    .catch(()=> console.log('Data base connection failure'));

//CORS Policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//Calls
app.use('/api/', apiLimiter);
app.use(express.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));

//Sanitize payloads from Express to prevent NoSQL injections
app.use(mongoSanitize());

//Export the app
module.exports = app;