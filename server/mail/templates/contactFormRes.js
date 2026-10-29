const contactFormEmail = (email, firstName, lastName, message, phoneNo, countrycode) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Response</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
            
            <h2 style="color: #333333;">Thank You for Contacting EduVerse!</h2>
            
            <p>Hi ${firstName} ${lastName},</p>
            
            <p>Thank you for reaching out to EduVerse. We have received your message and appreciate you taking the time to contact us.</p>
            
            <h3 style="color: #444444;">Your Submitted Details</h3>
            
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${countrycode || ""} ${phoneNo || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #6c63ff;">
                ${message}
            </p>
            
            <p>Our team will review your inquiry and get back to you as soon as possible.</p>
            
            <p>Best regards,<br><strong>The EduVerse Team</strong></p>
            
        </div>
    </body>
    </html>`;
};

module.exports = contactFormEmail;
