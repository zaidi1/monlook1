const logger = require('../startup/logging')
const Joi = require('joi')
var path = require('path')
const fs = require('fs')
const dbmodel = require('../models/registration_model')

const userRegSchema = Joi.object({
  FullName: Joi.string().min(2).max(500).required(),
  Email: Joi.string().max(450).email().required(),
  Phone: Joi.string().regex(/^\d{8}$/).required(),
  Password: Joi.string().max(250).required(),
  RegType: Joi.number().integer().less(8).required(),
  DeviceToken: Joi.string().max(250)
})

exports.registeruser = (req, res) => {
  // Joi.validate(req.body, userRegSchema, (err, value) => {
  //   if (err) {
  //     return res.status(400).send(err.details[0].message)
  //   }
    logger.info('in register user controller')
    dbmodel.registeruser(req.body, function (err, resultset) {
      if (err) {
        logger.info('Err registeruser - controller')
        res.json({ 'Message': err.message })
      } else {
        logger.info('user controller')
        res.send(resultset)
      }
    })
  // })
}

exports.resetPassword = (req, res) => {
  
  logger.info('in resetPassword controller')
    dbmodel.resetPassword(req.body, function (err, resultset) {
      if (err) {
        logger.info('Err resetPassword - controller')
        res.json({ 'Message': err.message })
      } else {
        logger.info('resetPassword controller')
        res.send(resultset)
      }
    })
}

const veritySchema = Joi.object({
  Email: Joi.string().max(500).email().required(),
  Usercode: Joi.number().integer().min(4).required()
})
exports.verifyusercode = (req, res) => {
  // Joi.validate(req.body, veritySchema, (err, value) => {
  //   if (err) {
  //     return res.status(400).send(err.details[0].message)
  //   }
    dbmodel.verifyusercode(req.body, function (err, resultset) {
      if (err) {
        logger.info('Err verifyusercode - controller')
        res.json({ 'Message': err.message })
      } else {
        logger.info('verifyusercode')
        res.send(resultset)
      }
    })
  // })
}

const resendSchema = Joi.object({
  Email: Joi.string().max(500).email().required()
})
exports.resendUserCode = (req, res) => {

  logger.info('Inside resend user code.')

  // Joi.validate(req.body, resendSchema, (err, value) => {
  //   if (err) {
  //     return res.status(400).send(err.details[0].message)
  //   }
    logger.info('in resendUserCode controller')
    dbmodel.resendUserCode(req.body, function (err, resultset) {
      if (err) {
        logger.info('Err resendUserCode - controller')
        res.json({ 'Message': err.message })
      } else {
        logger.info('resendUserCode controller')
        res.send(resultset)
      }
    })
  // })
}



const authSchema = Joi.object({
  Email: Joi.string().max(500).email().required(),
  Password: Joi.string().max(50).required()
})
exports.authenticateuser = (req, res) => {
  Joi.validate(req.body, authSchema, (err, value) => {
    if (err) {
      return res.status(400).send(err.details[0].message)
    }
    dbmodel.authenticateuser(req.body, function (err, resultset) {
      if (err) {
        res.send(err)
      } else {
        const val = resultset
        res.send(val)
      }
    })
  })
}

exports.uploadUserPicture = (req, res) => {

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.')
  }

  var userPicture = req.files.file
  let ext = path.extname(userPicture.name)
  let uid = req.body['userid']
  let destPath = `./public/mediafiles/userimages/${uid}${ext}`
  console.log(destPath)
  fs.writeFile(destPath, userPicture.data, (err) => {
    if (err) return res.status(500).send(err)
    res.send('File uploaded!')
  })
}

