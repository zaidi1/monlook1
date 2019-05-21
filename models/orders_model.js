
const logger = require('../startup/logging')
const util = require('util')
const emailer = require('./emailer')
const firebaseAdmin = require('./firebaseadmin')
const firebaseClient = require('./firebaseclient')
const firebase = firebaseClient.firebase
const bcrypt = require('bcrypt')
const dbPool = require('../startup/postgresdb')
// const dbClient = require('../startup/postgresdb').client


// 1 - CREATE ORDER
// 2 - GET_ODERS BY USER ID 
// 3 - UPDATE ORDERS
//Get Customers Orders
//Get Order Detail
//Get Service Provider Order
//
exports.createOrder = (input, output) => {
  logger.info('createOrder called.. inside model..')
  //Get ParamValues
  const user_id = input['user_id'];
  const provider_id = input['provider_id'];
  const booked_date = input['booked_date'];
  const booked_time = input['booked_time'];
  const total_amount = input['total_amount'];
  const adv_amount = input['adv_amount'];
  const services_ids = input['services_ids'];
  const booking_status = input['booking_status'];
  const is_home_service =input['is_home_service'];


  // output(null, {create_order: 30})

  //
  //Save in db
  const queryText = 'SELECT public."create_order"($1,$2,$3,$4,$5,$6,$7,$8,$9)'
  const params = [user_id, provider_id, booked_date, booked_time, total_amount, adv_amount, services_ids, booking_status,is_home_service];
  dbPool.query(queryText, params)
    .then((dbResult) => {
      strVal = JSON.stringify(dbResult.rows[0]);
      logger.info('success dbResult : ' + strVal)
      // emailer.sendEmail(email, pinCode, (err, value) => {
      //   if (err) {
      //     console.log('Email not sent.')
      //   } else {
      //     console.log('Email sent successfully: ', value)
      //   }
      // })
      output(null, dbResult.rows[0])
    }).catch((err) => {
      logger.error('createOrder - Error : ' + err)
      output(err, null)
    })
}

exports.GetCustomerOrders = (req, output) => {
    
  const userID = req.params.id
  // const AtHome = parseInt(req.params.AtHome)
  logger.info('userid = '+ userID);
  let qText = 'SELECT * FROM public.booking where "Customer_ID" = ' + userID;
  dbPool.query(qText)
    .then((dbResult) => {
        output(null, dbResult)
    })
    .catch((error) => {
       logger.error('getServices - Error : ' + error)
        output(error, null)
    })
  }
    