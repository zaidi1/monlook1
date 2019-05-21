const logger = require('../startup/logging')
const Joi = require('joi')
var path = require('path')
const fs = require('fs')
const dbModel = require('../models/orders_model')

exports.createOrder = (req, res) => {
  // let usrtype = req.params.userType
  dbModel.createOrder(req.body, function (err, dbResult) {
    if (err) {
      res.send(err)
    } else {
      console.log('Inside controller ' + dbResult)
      const val = dbResult
      res.send(val)
    }
  })
}

exports.GetCustomerOrders = (req, res) => {
  dbModel.GetCustomerOrders(req, function (err, dbResult) {
    if (err) {
      res.send(err)
    } else {
      const val = dbResult.rows
      res.send(val)
    }
  })
}