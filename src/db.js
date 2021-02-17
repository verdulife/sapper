require("dotenv").config();
import monk from "monk";
import Joi from "joi";

const db = monk(process.env.MONGO_URI || "localhost/verdu");

// COLLECTIONS
export const Messages = db.get("messages");
Messages.createIndex("message", { unique: true });

// SCHEMAS
export const messageSchema = Joi.object({
  _created: Joi.date().required(),
  _updated: Joi.date().required(),
  message: Joi.string().required(),
});
