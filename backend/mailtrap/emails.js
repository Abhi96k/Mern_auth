import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email;

  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent Successfully", response);
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Email sending failed");
  }
};

// export const sendWelcomeEmail = async (email, name) => {
//   const recipient = email;

//   try {
//     const response = await mailtrapClient.sendMail({
//       from: sender,
//       to: recipient,
//       template_uuid: "92ac4b8c-049c-4bdb-b804-a9d858d79141", // Ensure this UUID corresponds to your Mailtrap template
//       template_variables: {
//         company_info_name: "Mern Auth", // Variable used in your Mailtrap template
//         name: name, // Variable used in your Mailtrap template
//       },
//       subject: "Welcome to Our Service!",
//       // Adding a fallback text body to satisfy Mailtrap requirements
//       text: `Hello ${name},\n\nWelcome to Mern Auth! We're excited to have you with us.\n\nBest Regards,\nThe Mern Auth Team`,

//     });

//     console.log("Welcome email sent successfully", response);
//   } catch (error) {
//     console.log("Error:", error);
//     throw new Error("Welcome email sending failed");
//   }
// };

export const sendWelcomeEmail = async (email, name) => {
  const recipient = email;

  const htmlContent = WELCOME_EMAIL_TEMPLATE.replace("{userName}", name);

  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: "Welcome to Our Service!",
      html: htmlContent,
      text: `Hello ${name},\n\nWelcome to Mern Auth! We're excited to have you with us.\n\nBest Regards,\nThe Mern Auth Team`,
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Welcome email sending failed");
  }
};
