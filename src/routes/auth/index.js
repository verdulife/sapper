/* import { Users, userSchema } from "../_db";
import bcrypt from "bcryptjs";

export async function get(req, res, next) {
  try {
    let users = await Users.find();
    for (let u = 0; u < users.length; u++) delete users[u].password;
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function post(req, res, next) {
  try {
    const validUser = await userSchema.validateAsync(req.body);

    if (validUser) {
      const isUnique = await Users.findOne({ username: req.body.username });

      if (isUnique) {
        next(new Error("Username already in use. Please select another one."));
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
        const newUser = { username: req.body.username, password: hashedPassword };

        const addedUser = await Users.insert(newUser);
        delete addedUser.password;

        res.json(addedUser);
      }
    } else {
      next(validUser.error);
    }
  } catch (error) {
    next(error);
  }
}
 */