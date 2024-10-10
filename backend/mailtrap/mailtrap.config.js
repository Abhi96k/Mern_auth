import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = "d3839870a056670093af219e5e1dd9ce";

export const mailtrapClient = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "hello@demomailtrap.com",
  name: "Abhishek Nangare",
};

// const recipients = ["abhisheknangare67@gmail.com"];

// client
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
