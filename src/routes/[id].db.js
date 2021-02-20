import { Messages } from "../db";

export async function del(req, res, next) {
  try {
    const { id } = req.params;
    const removed = await Messages.remove({ _id: id });

    res.json({ id });
  } catch (error) {
    next(error);
  }
}
