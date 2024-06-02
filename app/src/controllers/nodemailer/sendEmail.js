require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

const {
  HOST_EMAIL,
  PORT_EMAIL,
  SECURE_EMAIL,
  AUTH_USER_EMAIL,
  AUTH_PASSWORD_EMAIL,
} = process.env;

const transporter = nodemailer.createTransport({
  host: HOST_EMAIL,
  port: PORT_EMAIL,
  secure: SECURE_EMAIL,
  auth: {
    user: AUTH_USER_EMAIL,
    pass: AUTH_PASSWORD_EMAIL,
  },
});

// transporter.verify().then(() => {
//   console.log('Ready for sen emails');
// });

async function sendToEmail(params) {
  try {
    await transporter.sendMail(params);
    return 'enviado';
  } catch (error) {
    return error;
  }
}

module.exports = { sendToEmail };
