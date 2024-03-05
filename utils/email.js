const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: 'Abdulrahman Mohamed <abdo@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    });

    console.log('email sent Successfully!');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = sendEmail;
