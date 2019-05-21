var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qshowdev@gmail.com',
    pass: 'aserty@@'
  }
})

module.exports.sendEmail = (toEmail, verifyCode, result) => {

  var mailOptions = {
      from: 'qshowdev@gmail.com',
      to: toEmail,
      subject: 'Verification Code from MONLOOK',
      text: `This is your verification code: ${verifyCode}`
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        result(error, null)
      } else {
        console.log('Email sent: ' + info.response)
        result(null, info.response)
      }
    })
}

module.exports.sendOrderEmail = (toEmail, verifyCode, result) => {

    var mailOptions = {
        from: 'qshowdev@gmail.com',
        to: toEmail,
        subject: 'Verification Code from MONLOOK',
        text: `This is your verification code: ${verifyCode}`
      }
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          result(error, null)
        } else {
          console.log('Email sent: ' + info.response)
          result(null, info.response)
        }
      })
}


module.exports.sendVerificationCodeByEmail = (toEmail, verifyCode, result) => {

  var mailOptions = {
      from: 'qshowdev@gmail.com',
      to: toEmail,
      subject: 'Verification Code from MONLOOK',
      text: `This is your verification code: ${verifyCode}`
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        result(error, null)
      } else {
        console.log('Email sent: ' + info.response)
        result(null, info.response)
      }
    })
}