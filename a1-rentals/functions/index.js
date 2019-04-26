
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
    
    const data = event.data();
    functions.firestore.document()

    const mailOptions = {
      to: data.toEmail,
      subject: data.subject === '' ? data.firstName + ' ' + data.lastName : data.subject,
      html: "<p>" + data.firstName + " " + data.lastName + " wants to be contacted" + "<br/></p>"
      + "<p>Message: " + data.message + "<br/></p>"
      + "<p>Phone: " + data.phoneNumber + "<br/></p>"
      + "<p>email: " + data.email + "<br/></p>"
    };
    
    return mailTransport.sendMail(mailOptions).then((stuff) => {
      console.log('Mail sent to: ' + data.toEmail);
    });
  });

exports.sendQuoteMessage = functions.firestore.document('quotes/{msgId}').onCreate(event => {
  
  const data = event.data();
  const cart = data.cart;
  let cartString = "<table><tr><th>Name</th><th>Quantity</th><th>Price</th></tr>";
  for (let i = 0; i < cart.length; i++) {
    cartString += cart[i]
  }
  cartString += "</table>"

  const mailOptions = {
    to: data.toEmail,
    subject: data.subject === '' ? data.firstName + ' ' + data.lastName : data.subject,
    html: "<p>" + data.firstName + " " + data.lastName + " wants to be contacted about their cart" + "<br/></p>"
    + "<p>Message: " + data.message + "<br/></p>"
    + "<p>Phone: " + data.phoneNumber + "<br/></p>"
    + "<p>email: " + data.email + "<br/></p>"
    + "<p>Items in Cart: <br/></p>"
    + cartString
  };
  
  return mailTransport.sendMail(mailOptions).then((stuff) => {
    console.log('Mail sent to: ' + data.toEmail);
  });
});