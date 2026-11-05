const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "EduVerse <onboarding@resend.dev>",
            to: [email],
            subject: title,
            html: body,
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log("Email sent successfully:", data.id);
        return data;

    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw error;
    }
};

module.exports = mailSender;



//we are not going to use nodemailer, as it requires paid access from render, instead we use resend
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//     },
//     connectionTimeout: 10000,
//     greetingTimeout: 10000,
//     socketTimeout: 15000,
// });

// transporter.verify()
//     .then(() => console.log("GMAIL SMTP CONNECTION SUCCESSFUL"))
//     .catch((error) => console.error("GMAIL SMTP CONNECTION FAILED:", error));

// const mailSender = async (email, title, body) => {
//     try {
//         const info = await transporter.sendMail({
//             from: `"EduVerse" <${process.env.MAIL_USER}>`,
//             to: email,
//             subject: title,
//             html: body,
//         });

//         console.log("Email sent successfully:", info.messageId);
//         return info;

//     } catch (error) {
//         console.error("Email sending failed:", error.message);
//         throw error;
//     }
// };

// module.exports = mailSender;