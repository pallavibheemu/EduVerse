
const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification | EduVerse</title>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial,Helvetica,sans-serif; color:#161d29;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
        style="background-color:#0f172a; padding:35px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
                    style="width:100%; max-width:600px; background-color:#ffffff; border-radius:14px; overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color:#161d29; padding:30px 24px;">
                            <p style="margin:0; font-size:28px; font-weight:bold; letter-spacing:0.5px; color:#ffffff;">
                                Edu<span style="color:#a78bfa;">Verse</span>
                            </p>
                            <p style="margin:10px 0 0; font-size:13px; color:#cbd5e1;">
                                Learn. Grow. Achieve.
                            </p>
                        </td>
                    </tr>

                    <!-- Purple accent -->
                    <tr>
                        <td style="height:5px; background-color:#7c3aed; font-size:0; line-height:0;">
                            &nbsp;
                        </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                        <td style="padding:36px 30px 30px;">

                            <p style="margin:0 0 12px; color:#7c3aed; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase;">
                                Account Security
                            </p>

                            <h1 style="margin:0 0 18px; color:#161d29; font-size:26px; line-height:1.3;">
                                Verify your email address
                            </h1>

                            <p style="margin:0 0 16px; color:#4b5563; font-size:15px; line-height:1.8;">
                                Hello!
                            </p>

                            <p style="margin:0 0 24px; color:#4b5563; font-size:15px; line-height:1.8;">
                                Thank you for registering with EduVerse. Use the one-time password below
                                to verify your email address and complete your registration.
                            </p>

                            <!-- OTP box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                                style="background-color:#f5f3ff; border:1px solid #ddd6fe; border-radius:10px;">
                                <tr>
                                    <td align="center" style="padding:25px 15px;">
                                        <p style="margin:0 0 12px; color:#6d28d9; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase;">
                                            Your verification code
                                        </p>

                                        <p style="margin:0; color:#4c1d95; font-size:34px; font-weight:bold; letter-spacing:8px; line-height:1.4;">
                                            ${otp}
                                        </p>

                                        <p style="margin:12px 0 0; color:#6b7280; font-size:13px;">
                                            This code expires in 5 minutes.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:24px 0 0; color:#4b5563; font-size:14px; line-height:1.8;">
                                If you didn't request this code, you can safely ignore this email.
                                Never share your verification code with anyone.
                            </p>

                            <p style="margin:24px 0 0; color:#374151; font-size:14px; line-height:1.7;">
                                Best regards,<br>
                                <strong style="color:#161d29;">Team EduVerse</strong>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color:#f8fafc; border-top:1px solid #e5e7eb; padding:22px 24px;">
                            <p style="margin:0 0 8px; color:#6b7280; font-size:12px; line-height:1.6;">
                                This email contains a one-time verification code for your EduVerse account.
                            </p>
                            <p style="margin:0; color:#9ca3af; font-size:12px;">
                                &copy; ${new Date().getFullYear()} EduVerse. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>`;
};

module.exports = otpTemplate;
