const nodemailer = require('nodemailer');

const sendEmailTo = mailOptions => {
    const transporter = nodemailer.createTransport({
        service: `${process.env.SMTP}`,
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`,
        },
        tls: { rejectUnauthorized: false },
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}

module.exports = sendEmailTo;