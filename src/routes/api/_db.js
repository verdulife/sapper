require("dotenv").config();
import monk from "monk";
import Joi from "joi";

const db = monk(process.env.MONGO_URI || "localhost/verdu");

//COLLECTIONS
export const Users = db.get("users");

//SCHEMAS
export const userSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  prime: Joi.boolean(),
});
