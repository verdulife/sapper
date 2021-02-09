import { User } from "./db";

export function get(req, res, next) {
  User.find({ name: "carlos" }, (err, user) => {
    if (err) return console.error(err);
    console.log(user);
    res.send(user);
  });
}
