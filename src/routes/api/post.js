import { User } from "./db";

export function post(req, res, next) {
  const user = new User(req.body);
  user.save().then(() => console.log("User added"));
}
