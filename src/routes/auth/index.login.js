require("dotenv").config();
import { Users, genAndResToken } from "../_helpers/db";
import bcrypt from "bcryptjs";

export async function post(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) throw new Error("user not found");
    if (!user.verified_email) throw new Error("account was not verified. please check your inbox.");

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) throw new Error("Incorrect password");

    genAndResToken(user, res);
  } catch (error) {
    next(error);
  }
}
