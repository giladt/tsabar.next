import nodemailer from "nodemailer";

const user = process.env.NODEMAILER_TRANSPORTER_USER;
const pass = process.env.NODEMAILER_TRANSPORTER_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass
  }
});

export const mailOptions: nodemailer.SendMailOptions = {
  from: user,
  to: user,
}