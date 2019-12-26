const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const msg = {
  to: 'guptarishu04@gmail.com',
  from: 'abeyoye@joy.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);