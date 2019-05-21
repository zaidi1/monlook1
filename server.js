/* eslint-disable indent */
const express = require('express')
const app = express()

const logger = require('./startup/logging')
require('./startup/routes')(app)
// require('./startup/prod')(app)

app.get('/', function (req, res, next) {
  res.send('Hello from MONLOOK World!')
})

app.get('/api', function (req, res, next) {
  res.send('Hello from MONLOOK APIs...')
})

const port = 5000 || process.env.PORT
// app.listen(port, '192.168.100.158', (error) => {
app.listen(port, (error) => {
  if (error) {
    logger.error(error)
  } else {
    logger.info(`=======================================================`)
    logger.info(`      MONLOOK-BACKEND-SERVER started at ${port}!     `)
    logger.info(`=======================================================`)
  }
})
