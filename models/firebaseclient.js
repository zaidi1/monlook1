const firebaseclient = require('firebase/app')
const firebaseAuth = require('firebase/auth')
// const firebaseDB = require('firebae/database')
const firebaseMessaging = require("firebase/messaging")
const logger = require('../startup/logging')

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmpT425g8ns1u8AnBYEhtFaM1UkXTPWEQ",
    authDomain: "monlook-a0a6b.firebaseapp.com",
    databaseURL: "https://monlook-a0a6b.firebaseio.com",
    projectId: "monlook-a0a6b",
    storageBucket: "monlook-a0a6b.appspot.com",
    messagingSenderId: "985246990667",
    appId: "1:985246990667:web:6fc36a29df1662ae"
}
firebaseclient.initializeApp(config)
logger.info(firebaseclient)

exports.firebase = firebaseclient
exports.firebaseAuth = firebaseAuth
// exports.firebaseDB = firebaseDB
exports.firebaseMessaging = firebaseMessaging
