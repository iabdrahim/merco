import nodemailer from "nodemailer";
import ALL from "../ALL.config";

type EmailPayload = {
  from: string;
  name: string;
  html: string;
};
// Replace with your SMTP credentials
const smtpOptions = {
  service: "gmail",
  auth: {
    user: ALL.sendFromEmail.mail,
    pass: ALL.sendFromEmail.password,
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    to: ALL.email,
    ...data,
  });
};
