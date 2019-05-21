
const express = require('express')
const error = require('../middleware/error')
const fileUpload = require('express-fileupload')
const registration = require('../routes/registration_router')
const orders = require('../routes/orders_router')
const users = require('../routes/users_router')

module.exports = function (app) {
  app.use(fileUpload())
  app.use(express.urlencoded())
  app.use(require('body-parser').json())
  app.use(require('body-parser').urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static('public'))

  app.use('/api/registration', registration)
  app.use('/api/order', orders)
  app.use('/api/user', users)
  app.use(error)
}
