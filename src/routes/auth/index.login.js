import { Users, userSchema } from "../_helpers/db";
import bcrypt from "bcryptjs";

export async function post(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) throw new Error("user not found");

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) throw new Error("not a good password");

    res.json(comparedPassword);
  } catch (error) {
    next(error);
  }
}
