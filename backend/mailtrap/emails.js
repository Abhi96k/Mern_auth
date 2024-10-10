import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const responce = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE(verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log("error", error);
  }
};
