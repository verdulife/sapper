import { Users, userSchema } from "../_helpers/db";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { template } from "./_email-templates/verify";

async function verificationEmail(userData, req) {
  const { _id, email } = userData;

  // const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp-es.securemail.pro",
    port: 465,
    secure: true,
    auth: {
      user: "hola@menuplis.com",
      pass: process.env.SMTP_URI || "88Menuplismail",
    },
  });

  const action_url = req.headers.host;
  console.log(action_url);

  const info = await transporter.sendMail({
    from: "'Menuplis' <hola@menuplis.com>",
    to: email,
    subject: "Email verification ✔",
    html: template(`${action_url}/auth/${_id}`),
  });

  console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export async function post(req, res, next) {
  try {
    req.body._created = new Date();
    req.body._updated = new Date();
    req.body.verified_email = false;

    const isValid = await userSchema.validateAsync(req.body);
    if (!isValid) throw new Error(isValid.error);

    const notUnique = await Users.findOne({ username: req.body.username });
    if (notUnique) throw new Error("Username already in use. Please select another one.");

    const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
    const newUser = { ...isValid, password: hashedPassword };
    const insertedUser = await Users.insert(newUser);
    delete insertedUser.password;

    verificationEmail(insertedUser, req);

    res.json(insertedUser);
  } catch (error) {
    next(error);
  }
}
