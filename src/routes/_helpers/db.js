require("dotenv").config();
import monk from "monk";
import Joi from "joi";

const db = monk(process.env.MONGO_URI || "localhost/verdu");

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
