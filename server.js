const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//DB config
mongoose.connect('mongodb://afazeradmin:afazeradmin0@ds251598.mlab.com:51598/afazer', { useNewUrlParser: true });
require('./src/models/Item');

//Server config
app.use(express.json());
app.use(cors());
app.use('/api', require('./src/routes'));

app.listen(3000, () => console.log('on'));