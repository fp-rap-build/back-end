const app = require('./api/app.js');
const port = process.env.PORT || 8000;

const { testEmail } = require('./api/utils/sendGrid');

app.listen(port, () => {
  console.log(`\n** Running on port ${port} **\n`);
  // testEmail();
});
app.timeout = 60 * 10 * 1000;
