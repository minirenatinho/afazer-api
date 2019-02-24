const express = require('express');
const routes = express.Router();

const itemController = require('./controllers/itemController');

routes.get('/items', itemController.index);
routes.get('/items/:id', itemController.get);
routes.post('/items', itemController.add);
routes.put('/items/:id', itemController.upd);
routes.delete('/items/:id', itemController.del);

const userController = require('./controllers/userController');

routes.get('/users', userController.index);
routes.get('/users/id/:id', userController.get);
routes.get('/users/:username', userController.getByUsername);
routes.post('/users', userController.add);
routes.put('/users', userController.upd);
routes.delete('/users', userController.del);

module.exports = routes;