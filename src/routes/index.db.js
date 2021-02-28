import { isLoggedIn } from "../middlewares";
import { Messages, messageSchema } from "./_helpers/db";

export async function get(req, res, next) {
  try {
    const { user } = req;
    const messages = await Messages.find();
    res.json({ user, messages });
  } catch (error) {
    next(error);
  }
}

export async function post(req, res, next) {
  try {
    const message = req.body;
    message._created = new Date();
    message._updated = new Date();
    const validMessage = await messageSchema.validateAsync(message);

    if (validMessage) {
      const addedMessage = await Messages.insert(validMessage);
      res.json(addedMessage);
    }
  } catch (error) {
    next(error);
  }
}
