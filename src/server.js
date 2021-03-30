const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

let config;
if(process.argv.includes('dev')) config = require('./config').dev;
else config = require('./config').prod;

mongoose.connect(config.mongodbAddress, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {

    //Start models
    require('./models/Item');
    require('./models/User');

    //Server config
    app.use(express.json());
    app.use(cors());
    app.use('/api', require('./routes'));

    app.listen(config.port, () => console.log(` MODE: ${config.mode}\n DB_ADDRESS: ${config.mongodbAddress}\n APP_PORT: ${config.port}`));

}).catch(err => console.error(err));