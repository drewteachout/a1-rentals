
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
  
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.firestore.document('messages/{msgId}').onCreate(event => {
    
    const data = event.data
    console.log(data);

    const mailOptions = {
      to: 'samloop16@gmail.com',
      subject: `Contact Info`,
      subject: `Contact Form Submitted`,
      text:`The following Contact Info was submitted: ` + "\n" + data.email
      + "\n" + data.firstName +
      + "\n" + data.lastName +
      + "\n" + data.message +
      + "\n" + data.phoneNumber +
      + "\n" + data.subject
    };
    
    return mailTransport.sendMail(mailOptions).then((stuff) => {
      console.log(stuff);
      console.log('Mail sent to: samloop16@gmail.com');
    });
  });