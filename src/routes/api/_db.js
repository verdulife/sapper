require("dotenv").config();
import monk from "monk";
import Joi from "joi";

const db = monk(process.env.MONGO_URI || "localhost/verdu");

// COLLECTIONS
export const Users = db.get("users");
Users.createIndex("username", { unique: true });

// SCHEMAS
export const userSchema = Joi.object({
  _created: Joi.date().required(),
  _updated: Joi.date().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().trim().min(8).required(),
  modules: Joi.object().keys({
    analytics: Joi.boolean(),
    translate: Joi.boolean(),
    print: Joi.boolean(),
    images: Joi.boolean(),
  }),
});
