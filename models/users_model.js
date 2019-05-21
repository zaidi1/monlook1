const logger = require('../startup/logging')
const util = require('util')
const emailer = require('./emailer')
const firebaseAdmin = require('./firebaseadmin')
const firebaseClient = require('./firebaseclient')
const firebase = firebaseClient.firebase
const dbPool = require('../startup/postgresdb')

exports.getUsersByType = (req, output) => {
    // logger.info('req.params.type ' + req.params.type)
    const type = req.params.type
    dbPool.query('SELECT * FROM public.users WHERE "UserType" = $1', [type])
      .then((dbResult) => {
        // logger.info(dbResult.rows);
        output(null, dbResult)
      })
      .catch((error) => {
        logger.error('getUsersByType - Error : ' + error)
        output(error, null)
      })
}

exports.getUserReviews = (req, output) => {
    const userID = req.params.id
    logger.info('userid = '+ userID);
    const qText = 'SELECT * FROM public.reviews WHERE "ServiceProvider_ID" = ' + userID;
    logger.info(qText);
    dbPool.query(qText)
      .then((dbResult) => {
        output(null, dbResult)
      })
      .catch((error) => {
        logger.error('getUserReviews - Error : ' + error)
        output(error, null)
      })
}
  
exports.getUserGallery = (req, output) => {
    const userID = req.params.id
    logger.info('userid = '+ userID);
    const qText = 'SELECT "isHomeServiceAvailable", unnest("Photos") as "imageSrc", "UserId" from public.profile WHERE "UserId" = ' + userID;
    logger.info(qText);
    dbPool.query(qText)
      .then((dbResult) => {
        output(null, dbResult)
      })
      .catch((error) => {
        logger.error('getUserGallery - Error : ' + error)
        output(error, null)
      })
  }

exports.getServices = (req, output) => {
    
  const userID = req.params.id
  const AtHome = req.params.AtHome
  // const AtHome = parseInt(req.params.AtHome)
  logger.info('userid = '+ userID);
  logger.info('AtHome ='+ AtHome);
    
  let qText = 'SELECT service_category."ID" as "category_id", "ServiceProvider_ID", service."Name" as "Service_Name", service."Name_ar" as "Service_Name_ar", service_category."Name" as "Category_Name", service_category."Name_ar" as "Category_Name_ar","Service_ID", "NormalPrice" as "Price"	FROM public.service_prices, public.service, public.service_category where service_prices."Service_ID" = service."ID" AND service_category."ID" = service."Category_ID" AND "ServiceProvider_ID" = ' + userID;
  if(AtHome == 1) {
      qText = 'SELECT service_category."ID" as "category_id", "ServiceProvider_ID", service."Name" as "Service_Name", service."Name_ar" as "Service_Name_ar", service_category."Name" as "Category_Name", service_category."Name_ar" as "Category_Name_ar","Service_ID", "HomePrice"	as "Price" FROM public.service_prices, public.service, public.service_category where service_prices."Service_ID" = service."ID" AND service_category."ID" = service."Category_ID" AND "ServiceProvider_ID" = ' + userID;
      logger.info(qText);
  }
  
  dbPool.query(qText)
    .then((dbResult) => {
        output(null, dbResult)
    })
    .catch((error) => {
       logger.error('getServices - Error : ' + error)
        output(error, null)
    })
  }

  exports.getArrivalTimes = (req, output) => {
      const userID = req.params.id
      logger.info('userid = '+ userID);
      const qText = 'SELECT unnest("AvailableTimings") as ArrivalTime FROM public.profile WHERE "UserId" = ' + userID;
      logger.info(qText);
      dbPool.query(qText)
        .then((dbResult) => {
          output(null, dbResult)
        })
        .catch((error) => {
          logger.error('getArrivalTimes - Error : ' + error)
          output(error, null)
        })
    }