import { Users, userSchema } from "./_db";

export async function get(req, res, next) {
  try {
    const { _id } = req.params;
    const item = await Users.findOne({ _id });
    if (!item) return next();
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function put(req, res, next) {
  try {
    const { _id } = req.params;
    const value = await userSchema.validateAsync(req.body);
    const item = await Users.findOne({ _id });
    if (!item) return next();
    const updated = await Users.update({ _id }, { $set: value });
    res.json(value);
  } catch (error) {
    next(error);
  }
}

export async function del(req, res, next) {
  try {
    const { _id } = req.params;
    await Users.remove({ _id });
    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
}
