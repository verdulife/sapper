import { Users } from "../_helpers/db";

export async function del(req, res, next) {
  try {
    const { username } = req.params;
    const removed = await Users.remove({ username });

    if (removed.deletedCount === 1) res.json({ message: `User ${username} removed` });
    else res.json({ message: `User ${username} not exists` });
  } catch (error) {
    next(error);
  }
}
