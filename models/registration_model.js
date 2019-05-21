
const logger = require('../startup/logging')
const util = require('util')
const sql = require('../startup/mysqldb')
const emailer = require('./emailer')
const firebaseAdmin = require('./firebaseadmin')
const firebaseClient = require('./firebaseclient')
const firebase = firebaseClient.firebase
const bcrypt = require('bcrypt')
const dbPool = require('../startup/postgresdb')
// const mysql = db.mysql
// const config = db.config
const bSalt = 10

exports.registeruser = (input, output) => {
  
  logger.info('registeruser called.. inside model..')

  // const uid = input['UID'];
  const fullName = input['FullName'];
  const email = input['Email'];
  const phone = input['Phone'];
  const password = input['Password'];
  const regType = input['RegType'];
  const photo = '';
  const deviceToken = input['deviceToken'];
  logger.info('device Token : '+ deviceToken);

// Encrypt password
  bcrypt.hash(password, bSalt, function(err, hash) {

    if(err) {
      logger.error('hash password - Error : ' + err)
      output(err, null)
      return;
    }
    logger.info('Generated Hash : ' + hash)
    // Connect with Firebase
    firebase.auth().createUserWithEmailAndPassword(email, hash)
      .then( (user) => {

        const userId = user.user.uid;
        strVal = JSON.stringify(user.user);
        logger.info("Success: firebase user:", strVal)
        var pinCode = Math.floor(1000 + Math.random() * 9000)
        logger.info('pin-code : ' + pinCode)

        const queryText = 'SELECT public."register_user"($1,$2,$3,$4,$5,$6,$7,$8,$9)'
        const params = [userId, fullName, email, phone, hash, regType, pinCode, photo, deviceToken];

        dbPool.query(queryText, params)
        .then((dbResult) => {
              
          strVal = JSON.stringify(dbResult.rows[0]);
          logger.info('success dbResult : ' + strVal)
         
          emailer.sendEmail(email, pinCode, (err, value) => {
            if (err) {
              console.log('Email not sent.')
            } else {
              console.log('Email sent successfully: ', value)
            }
          })
          output(null, dbResult.rows[0])

        }).catch((err)=>{
            logger.error('RegisterUser - Error : ' + err)
            output(err, null)
        })
      })
      .catch((err) => {
        logger.error('firebase auth - Error : ' + err)
        output(err, null)
      })

  });
}


exports.resetPassword = (input, output) => {

  const email = input['Email'];
  const password = input['Password'];

  logger.info('email = '+ email);
  logger.info('password = '+ password);

  bcrypt.hash(password, bSalt, function(err, hash) {

    if(err) {
      logger.error('hash password - Error : ' + err)
      output(err, null)
      return;
    }
    logger.info('Generated hash password : ' + hash)

    const queryText = 'UPDATE public.users SET "Password" = $1 where LOWER("Email") = LOWER($2)'
    const params = [hash, email];
  
    dbPool.query(queryText, params)
      .then((dbResult) => {
        logger.info('success reset password');
        output(null, {IsUpdated: 1});
      })
      .catch((err) => {
        logger.error('Reset Password  - Error : ' + err)
        output(err, null)
      })
  });
}

exports.resendUserCode = (input, result) => {

  var pincode = Math.floor(1000 + Math.random() * 9000)

  const UserEmail = input['UserEmail'];

  logger.info('Inisde resend User Code : Email = ' + UserEmail + ' , Pincode = ' + pincode)

  const queryText = 'SELECT public."update_usercode"($1,$2)'
  const params = [UserEmail, pincode];

  dbPool.query(queryText, params)
  .then((dbResult) => {
    strVal = JSON.stringify(dbResult.rows[0]);
    logger.info('success resendUserCode : ' + strVal)

    emailer.sendEmail(UserEmail, pincode, (err, value) => {
      if (err) {
        console.log('Email not sent.')
      } else {
        console.log('Email sent successfully: ', value)
      }
    })

    result(null, dbResult.rows[0])

  })
  .catch((err)=>{
    logger.error('resendUserCode - Error : ' + err)
    result(err, null)
  })

}

exports.verifyusercode = (input, result) => {

  const UserEmail = input['UserEmail'];
  const Code = input['Code'];

  const queryText = 'SELECT public."verify_usercode"($1,$2)'
  const params = [UserEmail, Code];

  dbPool.query(queryText, params)
  .then((dbResult) => {
    strVal = JSON.stringify(dbResult.rows[0]);
    logger.info('success verifyusercode : ' + strVal)
    result(null, dbResult.rows[0])

  })
  .catch((err)=>{
    logger.error('verifyusercode - Error : ' + err)
    result(err, null)
  })

}

exports.authenticateuser = (input, output) => {
  logger.info('authenticateuser called.. inside model..')

  const userEmail = input['Email']
  const pswd = input['Password']

  dbPool.query('SELECT "ID", "FullName", "ProfilePic", "Password", "IsApproved", "EmailVerified", "UserType" FROM users WHERE "Email" = $1', [userEmail])
    .then((dbResult) => {
      var resultset = { 'UserID': -1 }

      var dbRows = dbResult.rows

      if (dbRows.length > 0) {
        var record = dbRows[0]
        const strVal = JSON.stringify(record);
        logger.info(strVal);
        const emailVerified = record.EmailVerified;
        if (emailVerified != 1) {
          resultset = { 'UserID': -2 }
          output(null, resultset);
          return;
        }

        const IsApproved = record.IsApproved;
        if (IsApproved != 1) {
          resultset = { 'UserID': -3 }
          output(null, resultset);
          return;
        }


        logger.info(record.ID)
        logger.info(record.Password)
        const userPwd = record.Password
        bcrypt.compare(pswd, userPwd, function (err, rest) {  
          if (rest == true) {
            logger.info('Authenticate is successful')
            resultset = 
              { UserID: record.ID, 
                UserType : record.UserType,
                FullName : record.FullName,
                ProfilePic : record.ProfilePic  
              }
            output(null, resultset)
          }
          else {
            logger.error('Password - Error : ' + err)
            output(null, resultset)
          }
        })
      }
      else {
        output(null, resultset)
      }

    })
    .catch((error) => {
      logger.error('authenticateuser - Error : ' + error)
      output(error, null)
    })
}


// //////////////////  OLD REGISTRATION METHODS  //////////////////////////////
// const pool = new sql.ConnectionPool(config).connect();



// exports.verifyusercode = (input, result) => {
//   sql.connect(config).then(pool => {
//     pool.request()
//       .input('Email', sql.NVarChar(450), input['Email'])
//       .input('Usercode', sql.Int, input['Usercode'])
//       .execute('verify_usercode')
//       .then((recordset) => {
//         // logger.info('Inside model-result ' + recordset)
//         // console.dir(recordset)
//         result(null, recordset)
//         sql.close()
//       })
//       .catch((err) => {
//         logger.info('err model-err ' + err)
//         result(err, null)
//         sql.close()
//       })
//   })
//     .catch((err) => {
//       logger.info('err model-err ' + err)
//       result(err, null)
//       sql.close()
//     })
// }

exports.setupUserPicture = (userid, picpath, output) => {
  let picurl = `${picpath}`.toString()
  logger.info('picurl = ' + picurl)
  sql.connect(config).then(pool => {
    var req = pool.request()
    req.query(`update Users set PictureURL = ${picurl} where ID = ${userid}`)
      .then((recordset) => {
        // logger.info('Inside model-result ' + recordset)
        output(null, recordset)
        sql.close()
      })
      .catch((err) => {
        logger.info('err = ' + err)
        logger.info('err model-err ' + err)
        output(err, null)
        sql.close()
      })
  })
    .catch((err) => {
      logger.info('err model-err ' + err)
      output(err, null)
    })
}
