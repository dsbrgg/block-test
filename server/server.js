
// SET MODULES
const express = require('express');
const server = express();

const logger = require('morgan');

// SET PORT
let port = process.env.PORT || '3000';

// SET ROUTES
const balanceRouter = require('../routes/balance');

// SET MIDDLEWARE
server.use(logger('dev'));

// USE ROUTES IN APPLICATION
server.use('/balance', balanceRouter);

// CUSTOM ROUTE TO NOT FOUND ENDPOINTS
server.use((req, res, next) => {
    res.status(404).send({ error : 'Not found.' });
});

// APP LISTEN
server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

// EXPORT APP FOR TESTS
module.exports = { server };