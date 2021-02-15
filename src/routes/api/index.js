import { Users, userSchema } from "./_db";

export async function get(req, res, next) {
  try {
    res.json(await Users.find());
  } catch (error) {
    next(error);
  }
}

export async function post(req, res, next) {
  try {
    const validUser = await userSchema.validateAsync(req.body);
    const inserted = await Users.insert(validUser);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
}
