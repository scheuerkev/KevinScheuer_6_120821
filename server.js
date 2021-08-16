//setting requirements for server.js, import http from node and app.js
const http = require('http');
const app = require('./app.js');

//function normalizePort
const normalizePort = val => {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }
    if(port>=0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//function errorHandler provides errors if server is not listening
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe: ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//create server from http module
const server = http.createServer(app);

//events emitter on server behaviours
server.on('error', errorHandler);
server.on('listening', ()=>{
    //declare address and bind for 'listen' behaviour
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe: ' + address : 'port: ' + port;
    console.log('Server running on port : ' + bind);
});

//run server
server.listen(port);