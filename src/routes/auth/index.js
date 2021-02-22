import { Users } from "../_helpers/db";

export async function get(req, res, next) {
  try {
    let users = await Users.find();
    for (let u = 0; u < users.length; u++) delete users[u].password;
    res.json(users);
  } catch (error) {
    next(error);
  }
}
