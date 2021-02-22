import { Users, userSchema } from "../_helpers/db";
import bcrypt from "bcryptjs";

export async function post(req, res, next) {
  try {
    req.body._created = new Date();
    req.body._updated = new Date();

    const isValid = await userSchema.validateAsync(req.body);

    if (!isValid) throw new Error(isValid.error);

    const notUnique = await Users.findOne({ username: req.body.username });

    if (notUnique) throw new Error("Username already in use. Please select another one.");

    const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
    const newUser = { username: req.body.username, password: hashedPassword };
    const insertedUser = await Users.insert(newUser);
    delete insertedUser.password;

    res.json(insertedUser);
  } catch (error) {
    next(error);
  }
}
