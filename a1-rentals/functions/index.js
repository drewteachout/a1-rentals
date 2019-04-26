
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

exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(event => {
    const snapshot = event.data;
  // Only send email for new messages.
    if (snapshot.previous.val() || !snapshot.val().name) {
      return;
    }
    
    const val = snapshot.val();
    
    const mailOptions = {
      to: 'samloop16@gmail.com',
      subject: `Contact Info: ${val.name}`,
      html: val.html,
      subject: `Contact Form Submitted`,
      text:`The following Contact Info was submitted: ` + "\n" + this.model.toString()
    };
    
    return mailTransport.sendMail(mailOptions).then(() => {
      return console.log('Mail sent to: samloop16@gmail.com')
    });
  });