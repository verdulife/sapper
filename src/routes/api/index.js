import { Users, userSchema } from "./_db";

export async function get(req, res, next) {
  if (req.params) console.log(req.params);
  try {
    res.json(await Users.find());
  } catch (error) {
    next(error);
  }
}

export async function post(req, res, next) {
  try {
    const value = await userSchema.validateAsync(req.body);
    const inserted = await Users.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
}
