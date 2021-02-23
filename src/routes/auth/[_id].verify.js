import { Users } from "../_helpers/db";

export async function get(req, res, next) {
  try {
    const { _id } = req.params;
    const verified = await Users.findOne({ _id });

    if (!verified) throw new Error("this email verification has expired");
    delete verified.password;

    res.json({ verified });
  } catch (error) {
    next(error);
  }
}
