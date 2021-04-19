const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const testEmail = () => {
  const msg = {
    to: 'joseph.lasata@gmail.com', // Change to your recipient
    from: 'admin@familypromiseofspokane.org', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'Sending after a bit of refactoring',
    html: '<strong>Sending after a bit of refactoring</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

const requestStatusChange = (requestStatus, emailAddress) => {
  console.log('EMAIL', emailAddress);
  const msg = {
    to: emailAddress,
    from: 'admin@familypromiseofspokane.org',
    subject: 'Update! Your request status has changed',
    text: `Your Family Promise HAP Application status has been updated to ${requestStatus}`,
    html: `<p>Your Family Promise HAP Application status has been updated to <strong>${requestStatus}!</strong></p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { testEmail, requestStatusChange };
