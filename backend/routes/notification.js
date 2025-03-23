const express = require('express');
const { getUserNotifications } = require('../controllers/bookController');
const notificationRoute = express.Router()

notificationRoute.get('/:userId/', getUserNotifications)

module.exports = notificationRoute