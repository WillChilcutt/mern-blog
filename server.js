//Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernAppDB',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => 
{
    console.log('Mongoose has connected to the DB.')
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// HTTP Request logger
app.use(morgan('tiny'));
app.use('/api',routes);

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
}
else
[
    console.log('Not on prod')
]

app.listen(PORT, console.log(`Server is starting at ${PORT}`));