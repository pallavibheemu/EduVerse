const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
});

transporter.verify()
    .then(() => console.log("GMAIL SMTP CONNECTION SUCCESSFUL"))
    .catch((error) => console.error("GMAIL SMTP CONNECTION FAILED:", error));

const mailSender = async (email, title, body) => {
    try {
        const info = await transporter.sendMail({
            from: `"EduVerse" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info.messageId);
        return info;

    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw error;
    }
};

module.exports = mailSender;