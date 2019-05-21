const logger = require('../startup/logging')
const Joi = require('joi')
var path = require('path')
const fs = require('fs')
const dbmodel = require('../models/users_model')

exports.getUsersByType = (req, res) => {
    dbmodel.getUsersByType(req, function (err, dbResult) {
      if (err) {
        res.send(err)
      } else {
        const val = dbResult.rows
        res.send(val)
      }
    })
  }
  
  exports.getUserGallery = (req, res) => {
    dbmodel.getUserGallery(req, function (err, dbResult) {
      if (err) {
        res.send(err)
      } else {
        logger.info('Inside controller ' + dbResult.rows)
        const val = dbResult.rows
        res.send(val)
      }
    })
  }
  
  exports.getUserReviews = (req, res) => {
    dbmodel.getUserReviews(req, function (err, dbResult) {
      if (err) {
        res.send(err)
      } else {
        const val = dbResult.rows
        res.send(val)
      }
    })
  }

  exports.getServices = (req, res) => {
    dbmodel.getServices(req, function (err, dbResult) {
      if (err) {
        res.send(err)
      } else {
        const val = dbResult.rows
        res.send(val)
      }
    })
  }

  exports.getArrivalTimes = (req, res) => {
    dbmodel.getArrivalTimes(req, function (err, dbResult) {
      if (err) {
        res.send(err)
      } else {
        const val = dbResult.rows
        res.send(val)
      }
    })
  }
