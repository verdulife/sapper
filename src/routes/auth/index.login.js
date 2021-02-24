require("dotenv").config();
import { Users } from "../_helpers/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function post(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) throw new Error("user not found");
    if (!user.verified_email) throw new Error("account was not verified. please check your inbox.");

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) throw new Error("Incorrect password");

    const payload = { _id: user._id, username: user.username };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET || "NotARealSecreTT0k3nBaby&ItsNotR3allyLong@AllT00!",
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) throw new Error(err);
        res.json({ token });
      }
    );
  } catch (error) {
    next(error);
  }
}
