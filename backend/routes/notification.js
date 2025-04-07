const express = require('express');
const { getUserNotifications, deleteNotification } = require('../controllers/bookController');
const notificationRoute = express.Router()

notificationRoute.get('/:userId/', getUserNotifications)
notificationRoute.delete('/:id', deleteNotification);


module.exports = notificationRoute