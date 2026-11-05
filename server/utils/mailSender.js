
const nodemailer = require("nodemailer");

// Create reusable email transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 465,
    secure: Number(process.env.MAIL_PORT || 465) === 465,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
});

// Send email
const mailSender = async (email, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"EduVerse" <${process.env.MAIL_USER}>`,
            to: email,
            subject,
            html,
        });

        console.log("Email sent successfully:", info.messageId);

        return info;

    } catch (error) {
        console.error("EduVerse email sending failed:", error.message);

        throw error;
    }
};

module.exports = mailSender;
