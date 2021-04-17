const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'joseph.lasata@gmail.com', // Change to your recipient
  from: 'admin@familypromiseofspokane.org', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'Sending after a bit of refactoring',
  html: '<strong>Sending after a bit of refactoring</strong>',
};

const testEmail = () => {
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { testEmail };
