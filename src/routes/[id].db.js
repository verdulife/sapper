import { Messages } from "./_helpers/db";

export async function del(req, res, next) {
  try {
    const { id } = req.params;
    const removed = await Messages.remove({ _id: id });

    if (removed.deletedCount === 1) res.json(`Message with id ${id} removed`);
    else res.json(`Message with id ${id} not exists`);
  } catch (error) {
    next(error);
  }
}
