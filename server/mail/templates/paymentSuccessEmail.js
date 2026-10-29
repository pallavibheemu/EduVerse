exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Successful | EduVerse</title>
  </head>

  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f5fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  ">

    <table role="presentation" width="100%" cellspacing="0"
      cellpadding="0" border="0"
      style="background-color: #f4f5fb; padding: 35px 12px;">
      <tr>
        <td align="center">

          <!-- Main email container -->
          <table role="presentation" width="100%" cellspacing="0"
            cellpadding="0" border="0"
            style="
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
            ">

            <!-- Header -->
            <tr>
              <td style="
                background-color: #10172a;
                padding: 28px 32px;
                text-align: center;
              ">
                <h1 style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: -0.8px;
                ">
                  Edu<span style="color: #a78bfa;">Verse</span>
                </h1>

                <p style="
                  margin: 8px 0 0;
                  color: #cbd5e1;
                  font-size: 13px;
                  letter-spacing: 0.5px;
                ">
                  YOUR JOURNEY. YOUR FUTURE.
                </p>
              </td>
            </tr>

            <!-- Success section -->
            <tr>
              <td style="padding: 36px 32px 20px; text-align: center;">

                <div style="
                  display: inline-block;
                  width: 64px;
                  height: 64px;
                  line-height: 64px;
                  border-radius: 50%;
                  background-color: #dcfce7;
                  color: #15803d;
                  font-size: 34px;
                  font-weight: bold;
                ">
                  &#10003;
                </div>

                <h2 style="
                  margin: 22px 0 10px;
                  color: #111827;
                  font-size: 26px;
                  line-height: 1.3;
                ">
                  Payment Successful!
                </h2>

                <p style="
                  margin: 0;
                  color: #6b7280;
                  font-size: 15px;
                  line-height: 1.7;
                ">
                  Hi ${name || "Learner"},<br />
                  Your payment has been received successfully.
                  You're one step closer to achieving your learning goals!
                </p>

              </td>
            </tr>

            <!-- Amount paid -->
            <tr>
              <td style="padding: 8px 32px 28px;">
                <table role="presentation" width="100%" cellspacing="0"
                  cellpadding="0" border="0"
                  style="
                    background-color: #f5f3ff;
                    border: 1px solid #e9e1ff;
                    border-radius: 12px;
                  ">
                  <tr>
                    <td style="padding: 24px; text-align: center;">
                      <p style="
                        margin: 0 0 8px;
                        color: #6b7280;
                        font-size: 13px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                      ">
                        Total Amount Paid
                      </p>

                      <h2 style="
                        margin: 0;
                        color: #6d28d9;
                        font-size: 36px;
                        font-weight: 700;
                      ">
                        &#8377;${Number(amount).toLocaleString("en-IN")}
                      </h2>

                      <p style="
                        margin: 10px 0 0;
                        color: #15803d;
                        font-size: 13px;
                        font-weight: 600;
                      ">
                        &#10003; Transaction Confirmed
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Receipt details -->
            <tr>
              <td style="padding: 0 32px 30px;">

                <h3 style="
                  margin: 0 0 18px;
                  color: #111827;
                  font-size: 17px;
                ">
                  Payment Receipt
                </h3>

                <table role="presentation" width="100%" cellspacing="0"
                  cellpadding="0" border="0"
                  style="border-collapse: collapse;">

                  <tr>
                    <td style="
                      padding: 14px 0;
                      border-bottom: 1px solid #e5e7eb;
                      color: #6b7280;
                      font-size: 13px;
                    ">
                      Payment Status
                    </td>
                    <td align="right" style="
                      padding: 14px 0;
                      border-bottom: 1px solid #e5e7eb;
                      color: #15803d;
                      font-size: 13px;
                      font-weight: 700;
                    ">
                      SUCCESSFUL
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding: 14px 0;
                      border-bottom: 1px solid #e5e7eb;
                      color: #6b7280;
                      font-size: 13px;
                    ">
                      Order ID
                    </td>
                    <td align="right" style="
                      padding: 14px 0;
                      border-bottom: 1px solid #e5e7eb;
                      color: #111827;
                      font-size: 12px;
                      font-weight: 600;
                      overflow-wrap: anywhere;
                    ">
                      ${orderId}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding: 14px 0;
                      border-bottom: 1px solid #e5e7eb;
                      color: #6b7280;
                      font-size: 13px;
                    ">
                      Payment ID
                    </td>
                    <td align="right" style="
                      padding: 14px 0;
                      border-bottom: 1px solid #e5e7eb;
                      color: #111827;
                      font-size: 12px;
                      font-weight: 600;
                      overflow-wrap: anywhere;
                    ">
                      ${paymentId}
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding: 14px 0 0;
                      color: #6b7280;
                      font-size: 13px;
                    ">
                      Amount
                    </td>
                    <td align="right" style="
                      padding: 14px 0 0;
                      color: #111827;
                      font-size: 14px;
                      font-weight: 700;
                    ">
                      &#8377;${Number(amount).toLocaleString("en-IN")}
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- Learning message -->
            <tr>
              <td style="padding: 0 32px 32px;">

                <table role="presentation" width="100%" cellspacing="0"
                  cellpadding="0" border="0"
                  style="
                    background-color: #f9fafb;
                    border-radius: 10px;
                    border-left: 4px solid #8b5cf6;
                  ">
                  <tr>
                    <td style="padding: 18px 20px;">
                      <p style="
                        margin: 0 0 7px;
                        color: #111827;
                        font-size: 15px;
                        font-weight: 700;
                      ">
                        Your next chapter starts now.
                      </p>

                      <p style="
                        margin: 0;
                        color: #6b7280;
                        font-size: 13px;
                        line-height: 1.7;
                      ">
                        Thank you for choosing EduVerse.
                        Keep learning, keep growing, and keep moving
                        toward your goals. We're glad to be part of
                        your journey.
                      </p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="
                background-color: #10172a;
                padding: 26px 32px;
                text-align: center;
              ">
                <p style="
                  margin: 0 0 8px;
                  color: #ffffff;
                  font-size: 14px;
                  font-weight: 600;
                ">
                  Learn without limits. Grow without boundaries.
                </p>

                <p style="
                  margin: 0 0 14px;
                  color: #cbd5e1;
                  font-size: 12px;
                  line-height: 1.7;
                ">
                  This email confirms your payment on EduVerse.
                  Please keep it for your records.
                </p>

                <p style="
                  margin: 0;
                  color: #94a3b8;
                  font-size: 11px;
                  line-height: 1.6;
                ">
                  If you have questions about this transaction,
                  please contact our support team.<br />
                  &copy; ${new Date().getFullYear()} EduVerse.
                  All rights reserved.
                </p>
              </td>
            </tr>

          </table>

          <p style="
            margin: 18px 0 0;
            color: #9ca3af;
            font-size: 11px;
            text-align: center;
          ">
            This is an automated email. Please do not reply directly.
          </p>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
