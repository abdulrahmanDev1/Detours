const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY,
        },
      })
    );

    await transporter.sendMail({
      from: ' Detours <detours@yopmail.com>',
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
