const express = require('express');
const routes = express.Router();

const itemController = require('./controllers/itemController');

routes.get('/items', itemController.index);
routes.get('/items/:id', itemController.get);
routes.post('/items', itemController.add);
routes.put('/items/:id', itemController.upd);
routes.delete('/items/:id', itemController.del);

module.exports = routes;