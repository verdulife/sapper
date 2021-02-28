require("dotenv").config();
import monk from "monk";
import Joi from "joi";
import jwt from "jsonwebtoken";

const db = monk(process.env.MONGO_URI || "localhost/verdu");

export function genAndResToken(user, res) {
  const payload = { _id: user._id, username: user.username };

  jwt.sign(payload, process.env.TOKEN_SECRET || "NotARealSecreTT0k3nBaby&ItsNotR3allyLong@AllT00!", { expiresIn: "2000ms" }, (error, token) => {
    if (error) throw new Error(error);
    res.cookie("token", token, { httpOnly: true, secure: false, overwrite: true });
    res.json({ token });
  });
}

// COLLECTIONS
export const Users = db.get("users");
export const Messages = db.get("messages");
Users.createIndex("username", { unique: true });

// SCHEMAS
export const userSchema = Joi.object({
  _created: Joi.date().required(),
  _updated: Joi.date().required(),
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().alphanum().min(8).required(),
  email: Joi.string().email().required(),
  verified_email: Joi.boolean().required(),
});

export const messageSchema = Joi.object({
  _created: Joi.date().required(),
  _updated: Joi.date().required(),
  message: Joi.string().required(),
});
