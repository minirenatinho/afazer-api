const express = require('express');
const routes = express.Router();

const authController = require('./controllers/authController');

routes.get('/auth', authController.genAccess);

const itemController = require('./controllers/itemController');

routes.post('/items', itemController.add);
routes.get('/items', itemController.index);
routes.get('/items/:targetId', itemController.getById);
routes.patch('/items/:targetId', itemController.update);
routes.delete('/items/:targetId', itemController.delete);

const userController = require('./controllers/userController');

routes.post('/users', userController.add);
routes.get('/users', userController.index);
routes.get('/users/:targetId', userController.getById);
routes.patch('/users/:targetId', userController.update);
routes.delete('/users/:targetId', userController.delete);

module.exports = routes;