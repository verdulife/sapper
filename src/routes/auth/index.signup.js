import { Users, userSchema } from "../_helpers/db";
import bcrypt from "bcryptjs";
const nodemailer = require("nodemailer");

async function verificationEmail(userData) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"verdu 🖤" <verdu@live.com>',
    to: userData.email,
    subject: "Email verification ✔",
    html: `<b>http://localhost:3000/auth/${userData.password}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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

    verificationEmail(newUser);

    res.json(insertedUser);
  } catch (error) {
    next(error);
  }
}
