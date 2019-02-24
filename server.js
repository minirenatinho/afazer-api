const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

let mongodbAddress = 'mongodb://afazeradmin:afazeradmin0@ds251598.mlab.com:51598/afazer';

const isDev = process.argv.includes('dev');
if(isDev) mongodbAddress = 'mongodb://localhost:27017/afazer';

//DB config
mongoose.connect(mongodbAddress, { useNewUrlParser: true });
require('./src/models/Item');
require('./src/models/User');

//Server config
app.use(express.json());
app.use(cors());
app.use('/api', require('./src/routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('dev: '+isDev));